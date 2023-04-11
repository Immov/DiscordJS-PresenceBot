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
4. Install necessary packaces:
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

# Image Used
[Calendar](https://www.flaticon.com/free-icon/calendar_1642767)