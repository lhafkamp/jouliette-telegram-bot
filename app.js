const express = require('express');
const path = require('path');
const TelegramBot = require('node-telegram-bot-api');
const Stomp = require('@stomp/stompjs');
require('dotenv').config();
const app = express();

// connect to Spectrals RabbitMQ to allow for a stomp socket connection
const client = Stomp.client(process.env.SPECTRAL_DB_URL);
client.connect(process.env.MQTT_USER, process.env.MQTT_PASS, onConnect, console.error, '/');

// set up Telegram bot
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, {polling: true});

// connection endpoints
const endpoints = {
	'#': '/exchange/power/#',  // all
	'00': '/exchange/power/00', // main meter
	'A0': '/exchange/power/A0', // metabolic lab
	'A1': '/exchange/power/A1', // tech boat
	'B0': '/exchange/power/B0', // crossboat
	'C0': '/exchange/power/C0', // cafe
	'01': '/exchange/power/01', // boats
	'02': '/exchange/power/02',
	'03': '/exchange/power/03',
	'04': '/exchange/power/04',
	'05': '/exchange/power/05',
	'06': '/exchange/power/06',
	'07': '/exchange/power/07',
	'08': '/exchange/power/08',
	'09': '/exchange/power/09',
	'10': '/exchange/power/10',
	'11': '/exchange/power/11',
	'12': '/exchange/power/12',
	'13': '/exchange/power/13',
	'14': '/exchange/power/14',
	'Biogasboat': '/exchange/biogasboat', // biogasboat
	'Liveliness': '/exchange/liveliness' // liveliness
};

// on connection with RabbitMQ, subscribe to a boats data
function onConnect() {
	client.subscribe(endpoints.Liveliness, onData);
}

// variables for comparing old data with new data
let oldTrue = null;
let oldFalse = null;

// checks which probes are on/off (return true/false)
function onData(data) {
	const probes = JSON.parse(data.body);
	const keys = Object.keys(probes);

	// filter the incoming data for true/false and sort them so they are easy to compare
	const trueProbes = keys.filter(key => probes[key]).sort();
	const falseProbes = keys.filter(key => !probes[key]).sort();

	// variables for comparing old data with new data
	let newTrue = trueProbes;
	let newFalse = falseProbes;
	
	// send all the new true probes to the subscribeToTrue function
	if (JSON.stringify(oldTrue) !== JSON.stringify(newTrue) && trueProbes.length > 0) {
		subscribeToTrue(trueProbes);
	}

	// send all the new false probes to the reportFalse function
	if (JSON.stringify(oldFalse) !== JSON.stringify(newFalse) && falseProbes.length > 0) {
		reportFalse(falseProbes);
	}

	// variables for comparing old data with new data
	oldTrue = trueProbes;
	oldFalse = falseProbes;
}

// subscribe to all true probes
function subscribeToTrue(probes) {
	console.log('incoming true probes');
	probes.forEach(probe => {
		client.subscribe(endpoints[probe], checkForData);
	});
}

// call the reportEmptyData function if a true probe doesn't provide data
function checkForData(data) {
	const probe = JSON.parse(data.body);
	console.log('incoming subscription');

	if (!probe) {
		reportEmptyData(probe.id);
	}
}

// report to the Telegram bot
function reportEmptyData(probe) {
	const response = `boat ${probe} is online but not reporting data`;
	bot.sendMessage(process.env.CHAT_ID, response);
	console.log(response);
}

// report to the Telegram bot
function reportFalse(falseProbes) {
	const response = `the following boats are currently down: ${falseProbes}`;
	bot.sendMessage(process.env.CHAT_ID, response);
	console.log(response);
}

// get the public files
app.use(express.static('public'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// render the index page
app.get('/', (req, res) => {
	res.render('index');
});

app.listen(9001, () => {
	console.log('server running on 9001..');
});
