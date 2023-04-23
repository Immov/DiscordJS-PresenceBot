const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const tap = require('../../models/tap');
const { insertDB } = require('../../utils/insertDB');
const { lookupName } = require('../../utils/lookupUser');
const { getFormattedTimestamp } = require('../../utils/dateUtils');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('inwfo')
		.setDescription(
			'Sign In untuk yang seharusnya WFO dialihkan menjadi WFH'
		)
		.addStringOption((option) =>
			option
				.setName('reason')
				.setDescription('Alasan mengalihkan WFO menjadi WFH')
				.setRequired(true)
		),
	async execute(interaction) {
		const timestamp = getFormattedTimestamp();

		const longName = await lookupName(interaction.user.id);
		const reasoning = interaction.options.get('reason')?.value; // Reason
		const message = `[SIGN IN][WFO]: ${
			interaction.user.id
		} ${new Date().getHours()}:${new Date().getMinutes()} [REASON]: ${reasoning}`;
		const output = new EmbedBuilder()
			.setTitle('SIGN IN - WFO')
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
			})
			.addFields({
				name: 'Reason:',
				value: `${reasoning}`,
				inline: true,
			});

		const wfoSchema = new tap({
			userID: interaction.user.id,
			fullName: longName,
			tap: `in-wfo`,
			date: new Date(),
			reason: reasoning,
			hour: new Date().getHours(),
			minute: new Date().getMinutes(),
		});
		await interaction.reply({ embeds: [output] });
		insertDB(wfoSchema);
		console.log(message);
	},
};
