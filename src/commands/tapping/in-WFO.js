const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const tap = require('../../models/tap');
const { insertDB } = require('../../functions/insertDB');
const { lookupName } = require('../../functions/lookupUser');

const now = new Date();
let hour = now.getHours();
let minute = now.getMinutes();
hour = hour <= 9 ? '0' + hour : hour;
minute = minute <= 9 ? '0' + minute : minute;
const zone = (now.getTimezoneOffset() / 60) * -1;
const unixTime = (Date.now() / 1000) | 0;
const timestamp = `<t:${unixTime}:t> - <t:${unixTime}:d>`;

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
		const now = new Date();
		let hour = now.getHours();
		let minute = now.getMinutes();
		hour = hour <= 9 ? '0' + hour : hour;
		minute = minute <= 9 ? '0' + minute : minute;
		const zone = (now.getTimezoneOffset() / 60) * -1;
		const unixTime = (Date.now() / 1000) | 0;
		const timestamp = `<t:${unixTime}:t> - <t:${unixTime}:d>`;

		const longName = await lookupName(interaction.user.id);
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
			fullName: longName,
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
