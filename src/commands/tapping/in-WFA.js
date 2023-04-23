const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const tap = require('../../models/tap');
const { insertDB } = require('../../utils/insertDB');
const { lookupName } = require('../../utils/lookupUser');
const { getFormattedTimestamp } = require('../../utils/dateUtils');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('in')
		.setDescription('Sign In untuk freelance / remote'),
	async execute(interaction) {
		const timestamp = getFormattedTimestamp();

		var longName = await lookupName(interaction.user.id);
		const message = `[SIGN IN][WFA]: ${
			interaction.user.id
		} ${new Date().getHours()}:${new Date().getMinutes()}`;

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
				inline: true,
			});
		const wfoSchema = new tap({
			userID: interaction.user.id,
			fullName: longName,
			tap: `in-wfa`,
			date: new Date(),
			hour: new Date().getHours(),
			minute: new Date().getMinutes(),
		});
		await interaction.reply({ embeds: [output] });
		insertDB(wfoSchema);
		console.log(message);
	},
};
