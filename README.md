# Telegram bot for Jouliette
A Telegram bot that notifies the user once something is wrong with the solar power data.

## Features
-  [x] sends a notification through a Telegram bot when a boat is offline
-  [x] sends a notification through a Telegram bot when a boat is online but not reporting data
-  [x] checks if the incoming data is the same to make sure you don't get spammed with old information
-  [x] listens to commando's like /start /help /report and reponds accordingly

## How the bot works
Once the server is running and the bot is added to your group it will report the current status of the boats. The use of this bot is to notify you whenever something is wrong so that you can take immediate action into fixing it. The bot will report which boats are offline and thus not sending data and it will report which boats are online but also not sending data. The bot offers a /help command to help you set up the bot with the server and a /report command to remind you what the latest status was.

## Build
Clone this repository:
```bash
git clone
```
  
Install packages:
```bash
npm install
```
Start the server:
```bash
npm start
```

### Environment variables
In order to get this app working you need to fill in the following <a href="https://www.npmjs.com/package/dotenv">dotenv</a> variables:  

```bash
SPECTRAL_DB_URL={your Stomp DB url here}
```  
```bash
MQTT_USER={your MQTT username here}
```  
```bash
MQTT_PASS={your redirect uri here}
```  
Once you have these variables you have add a <a href="https://www.npmjs.com/package/node-telegram-bot-api">Telegram bot</a> token. 

You can either receive this Telegram bot token by searching for @Mkd822bot (Testboi) in the Telegram app if you don't want to create your own bot.

If you do want to create your own bot, you can receive this Telegram bot 
token by searching for 'BotFather' in the Telegram app. Send him '/newbot' as a message and follow the <a href="https://github.com/hosein2398/node-telegram-bot-api-tutorial">instructions</a>:

![Telegram bot](https://raw.githubusercontent.com/hosein2398/node-telegram-bot-api-tutorial/master/pics/BotFather.JPG)

```bash
BOT_TOKEN={your Telegram bot code here}
```

Finally you need to allow the bot to send you notifications. For this you have to set your chat ID as an environment variable.
To find you chat ID you have to follow 3 simple steps:
1. Search for @RawDataBot in the Telegram app and add it to your group
2. Look for the group chat ID in the object that @RawDataBow displayed and add it as an environment variable.

```bash
CHAT_ID={your chat ID here}
```

3. Remove @RawDataBot from the group to prevent spam

All done!

## License

MIT License  

Copyright © 2018 Luuk Hafkamp
