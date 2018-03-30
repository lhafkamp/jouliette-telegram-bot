const express = require('express');
const path = require('path');
require('dotenv').config();
const app = express();
const port = 9001;
const botController = require('./controllers/botController');

// get the public files
app.use(express.static('public'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// render the index page
app.get('/', (req, res) => {
	res.render('index');
});

// initiate the Telegram bot
botController.init();

app.listen(port, () => {
	console.log(`server running on ${port}...`);
});
