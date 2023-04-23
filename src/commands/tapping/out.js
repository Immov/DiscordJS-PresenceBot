const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const tap = require('../../models/tap');
const { insertDB } = require('../../utils/insertDB');
const { getFormattedTimestamp } = require('../../utils/dateUtils');
const { lookupName } = require('../../utils/lookupUser');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('out')
		.setDescription('Selesai Bekerja'),
	async execute(interaction) {
		const timestamp = getFormattedTimestamp();

		const longName = await lookupName(interaction.user.id);
		const message = `[SIGN OUT]: ${
			interaction.user.id
		} ${new Date().getHours()}:${new Date().getMinutes()}`;

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
				inline: true,
			});
		const signOutSchema = new tap({
			userID: interaction.user.id,
			fullName: longName,
			tap: `out`,
			date: new Date(),
			hour: new Date().getHours(),
			minute: new Date().getMinutes(),
		});
		await interaction.reply({ embeds: [output] });
		insertDB(signOutSchema);
		console.log(message);
	},
};
