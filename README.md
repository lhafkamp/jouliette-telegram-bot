# Telegram bot for Jouliette
A Telegram bot that notifies the user once something is wrong with the solar power data.

## Features
-  [x] sends a notification through a Telegram bot when a boat is offline
-  [x] sends a notification through a Telegram bot when a boat is online but not reporting data
-  [x] checks if the incoming data is the same to make sure you don't get spammed with old information.

## Environment variables
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
Once you have these variables you have add a <a href="https://www.npmjs.com/package/node-telegram-bot-api">Telegram bot</a> token. You can receive this Telegram bot 
token by searching for 'BotFather' in the Telegram app. Send him '/newbot' as a message and follow the <a href="https://github.com/hosein2398/node-telegram-bot-api-tutorial">instructions</a>:

![Telegram bot](https://raw.githubusercontent.com/hosein2398/node-telegram-bot-api-tutorial/master/pics/BotFather.JPG)

```bash
BOT_TOKEN={your Telegram bot code here}
```

Finally you need to allow the bot to send you notifications. For this you have to set your chat ID as an environment variable.
To find you chat ID you have to follow 3 simple steps:
1. Add the Telegram bot that you created with BotFather to your group
2. Initiate the bot by sending /start
3. Go to the following url: https://api.telegram.org/{your Telegram bot code here}/getUpdates

The url should show you an object with your chat ID.

```bash
CHAT_ID={your chat ID here}
```


## License

MIT License  

Copyright © 2017 Luuk Hafkamp
