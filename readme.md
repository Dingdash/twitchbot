# Personal Twitch bot 
This is a chat bot made with [tmi.js](https://github.com/tmijs/tmi.js)
## Requirements
1. Credentials which is usename and oauth token from twitch.
2. Nodejs v12 or newer

## Get Started
```
npm install
node index.js
```
## Configuration
make credentials.js file
Example credentials.js file


```javascript
export const BOT_USERNAME = "yourusername";
export const BOT_PASSWORD = "yourbotpassword";
```

## Features and Commands
```
!openqueue - to open queue where users can join
!join - user join the queue
!leave - user leave the queue
!clear -  reset the queue
!close - close the queue
!emoteY - channel is on emote-only mode
!emoteN - channel is no longer emote-only
!followerY - channel is on follower-only mode
!followerN - channel is no longer follower-only
```