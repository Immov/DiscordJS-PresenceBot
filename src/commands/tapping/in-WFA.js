const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const tap = require('../../models/tap');
const { insertDB } = require('../../functions/insertDB');
const { lookupName } = require('../../functions/lookupUser');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('in')
		.setDescription('Sign In untuk freelance / remote'),
	async execute(interaction) {
		const now = new Date();
		let hour = now.getHours();
		let minute = now.getMinutes();
		hour = hour <= 9 ? '0' + hour : hour;
		minute = minute <= 9 ? '0' + minute : minute;
		const zone = (now.getTimezoneOffset() / 60) * -1;
		const unixTime = (Date.now() / 1000) | 0;
		const timestamp = `<t:${unixTime}:t> - <t:${unixTime}:d>`;

		var longName = await lookupName(interaction.user.id);
		const message = `[SIGN IN][WFA]: ${interaction.user.tag} - ${hour}:${minute} [GMT]: ${zone}`;

		const output = new EmbedBuilder()
			.setTitle('SIGN IN - WFA')
			.setColor('Green')
			.addFields({
				name: 'User',
				value: `<@${interaction.user.id}>`,
				inline: true,
			})
			.addFields({
				name: 'Signed In:',
				value: `${timestamp}`,
				// value: `${hour}:${minute}`,
				inline: true,
			});
		const wfoSchema = new tap({
			userID: interaction.user.id,
			fullName: longName,
			tap: `in-wfa`,
			date: now,
			hour: now.getHours(),
			minute: now.getMinutes(),
		});
		await interaction.reply({ embeds: [output] });
		insertDB(wfoSchema);
		console.log(message);
	},
};
