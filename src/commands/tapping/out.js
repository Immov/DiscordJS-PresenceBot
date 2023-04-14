const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const tap = require('../../models/tap');
const { insertDB } = require('../../functions/insertDB');
const { lookupName } = require('../../functions/lookupUser');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('out')
		.setDescription('Selesai Bekerja'),
	async execute(interaction) {
		const now = new Date();
		const zone = (now.getTimezoneOffset() / 60) * -1;
		const unixTime = (Date.now() / 1000) | 0;
		const timestamp = `<t:${unixTime}:t> - <t:${unixTime}:d>`;

		const longName = await lookupName(interaction.user.id);
		const message = `[SIGN OUT]: ${
			interaction.user.id
		} - ${now.getHours()}:${now.getMinutes()} [GMT]: ${zone}`;

		const output = new EmbedBuilder()
			.setTitle('SIGN OUT')
			.setColor('Red')
			.addFields({
				name: 'User',
				value: `<@${interaction.user.id}>`,
				inline: true,
			})
			.addFields({
				name: 'Signed Out:',
				value: `${timestamp}`,
				// value: `${hour}:${minute}`,
				inline: true,
			});
		const signOutSchema = new tap({
			userID: interaction.user.id,
			fullName: longName,
			tap: `out`,
			date: now,
			hour: now.getHours(),
			minute: now.getMinutes(),
		});
		await interaction.reply({ embeds: [output] });
		insertDB(signOutSchema);
		console.log(message);
	},
};
