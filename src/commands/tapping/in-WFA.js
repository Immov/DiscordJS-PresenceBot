const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const tap = require('../../models/tap');
const { insertDB } = require('../../functions/insertDB');
const {
	now,
	hour,
	minute,
	zone,
	unixTime,
	timestamp,
} = require('../../var/waktu');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('in')
		.setDescription('Sign In untuk freelance / remote'),
	async execute(interaction) {
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
