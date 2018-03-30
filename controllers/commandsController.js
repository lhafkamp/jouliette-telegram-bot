exports.init = function (bot) {
	const startResponse = `The Joulliete Telegram bot is online and ready to be used! 

Type /help if you didn't setup the bot yet. Once everything is set you can wait for the data to come in or type /report to see the current status`;

	bot.sendMessage(process.env.CHAT_ID, startResponse);

	let reportNotWorking = 'Nothing to report';
	let reportOffline = 'Nothing to report';

	// send the message if a user types /start, /help or /report
	bot.on('message', (msg) => {
		const helpResponse = `This bot needs your chat ID to send notifications. 

Add @RawDataBot to your Telegram group and it will send you an object with your chat ID. 

Set the CHAT_ID as an environment variable using the <a href="https://www.npmjs.com/package/dotenv">dotenv</a> package in your Node.js project.`;

		if (msg.text === '/start') {
			bot.sendMessage(process.env.CHAT_ID, startResponse);
		}

		if (msg.text === '/help') {
			bot.sendMessage(process.env.CHAT_ID, helpResponse, { parse_mode: "HTML" });
		}

		if (msg.text === '/report') {
			bot.sendMessage(process.env.CHAT_ID, `<b>Offline boats:</b> ${reportOffline}`, { parse_mode: "HTML" })
			bot.sendMessage(process.env.CHAT_ID, `<b>Last online boat with no data:</b> ${reportNotWorking}`, { parse_mode: "HTML" })
		}
	});
};
