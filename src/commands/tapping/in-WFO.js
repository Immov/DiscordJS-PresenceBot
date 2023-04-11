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
		const reasoning = interaction.options.get('reason')?.value; // Reason
		const message = `[SIGN IN][WFO]: ${interaction.user.tag} - ${hour}:${minute} [GMT]: ${zone} [REASON]: ${reasoning}`;
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
				// value: `${hour}:${minute}`,
				inline: true,
			});

		const wfoSchema = new tap({
			userID: interaction.user.id,
			tap: `in-wfo`,
			date: now,
			reason: reasoning,
			hour: now.getHours(),
			minute: now.getMinutes(),
		});
		await interaction.reply({ embeds: [output] });
		insertDB(wfoSchema);
		console.log(message);
	},
};
