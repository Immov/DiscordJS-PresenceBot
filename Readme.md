# Requirements
- Node.js

# Create Discord Application
## Creating Discord bot
1. Go to: https://discord.com/developers/
2. Create an application
3. Go to Bot, Add bot
4. Disable Public Bot to make it private
5. Priviledge Gateway Intents:
	- [x] Presence Intent
	- [x] Server members Intent
	- [x] Message content intent
6. Invite the bot to server:
	- Go to OAuth2
	- At Scopes, check `bot` & `application.command` (Slash Commands)
	- At Bot permission, check `Administrator`
	- Copy the link and invite the bot to the server

## Initialize Node.js
1. Open folder with vscode
2. `npm init -y`
3. `package.json` set `"main": "src/index.js"`
4. Install necessary packaces For Discord Bot:
	- `npm install discord.js --save`
	<br>discord api
	- `npm install dotenv --save`
	<br>.env environment variable
	- `npm install nodemon -g --save`: autorun when changes
	<br>`Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
	<br>enable nodemon execution on powershell
	- `npm install mongoose --save`
	<br>database mongodb api
5. Run with `nodemon` command
6. Install necessary packages for web:
	- `npm install express --save`
	<br>Web framework
	- `npm install ejs --save`
	<br>ejs for express views

# .env Variables
1. MONGODB_URI (URI to connect to mongoDB server)
2. CLIENT_ID (Client ID / Application ID of the BOT )
3. GUILD_ID (Server ID) (For registering slash command)
4. TOKEN (Discord Bot Token)
5. PORT (Express.js Port to run at)

# Image Used
[Calendar](https://www.flaticon.com/free-icon/calendar_1642767)

# Docker Commands
- build `docker build -t presence-bot .`
- run `docker run -v "$(pwd)":/app/ -p 3000:3000 presence-bot`