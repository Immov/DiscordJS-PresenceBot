// Node Modules
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const mongoose = require('mongoose');
const ejs = require('ejs');
const express = require('express');
require('dotenv').config();
// Files and folder system path
const fs = require('node:fs');
const path = require('node:path');
// Models
const tap = require('./models/tap');

const client = new Client({
	intents: [GatewayIntentBits.Guilds],
});
const app = express();
app.set('view engine', 'ejs');

const port = process.env.PORT || 3000;

// Functions
client.once(Events.ClientReady, (c) => {
	console.log(`🌏 ${c.user.tag} is online!`);
});

// Command Collections
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs
		.readdirSync(commandsPath)
		.filter((file) => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(
				`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
			);
		}
	}
}

// Execute the Command
client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({
				content: 'There was an error while executing this command!',
				ephemeral: true,
			});
		} else {
			await interaction.reply({
				content: 'There was an error while executing this command!',
				ephemeral: true,
			});
		}
	}
});

// Express.js Routes
app.get('/', async (req, res) => {
	try {
		const taps = await tap.find();
		res.render('index', {
			taps,
			month: 'All',
			year: 'Taps',
		});
	} catch (error) {
		res.status(500).send(error);
	}
});

app.get('/:year/:month', async (req, res) => {
	try {
		const year = parseInt(req.params.year);
		const month = parseInt(req.params.month);
		const taps = await tap.find({
			date: {
				$gte: new Date(year, month - 1, 1),
				$lt: new Date(year, month, 1),
			},
		});
		res.render('index', {
			month,
			year,
			taps,
		});
	} catch (error) {
		res.status(500).send(error);
	}
});

// Main
(async () => {
	try {
		// DB
		await mongoose.connect(process.env.MONGODB_URI, { keepAlive: true });
		console.log('Connected to DB');
		app.listen(port, () => {
			console.log(`Server is listening on port ${port}`);
		});
		client.login(process.env.TOKEN);
	} catch (error) {
		console.log(error);
	}
})();
