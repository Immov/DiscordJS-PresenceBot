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
		.setName('inlec')
		.setDescription('Sign In bagi pada lecturer')
		.addAttachmentOption((option) =>
			option
				.setName('proof')
				.setDescription('Foto bukti mengajar')
				.setRequired(true)
		),
	async execute(interaction) {
		const img = interaction.options.getAttachment('proof').url;
		const message = `[SIGN IN][LEC]: ${interaction.user.tag} - ${hour}:${minute} [GMT]: ${zone} [PROOF]: ${img}`;
		const output = new EmbedBuilder()
			.setTitle('SIGN IN - Lecturer')
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
			tap: `in-lec`,
			date: now,
			proofURL: img,
			hour: now.getHours(),
			minute: now.getMinutes(),
		});
		await interaction.reply({ embeds: [output] });
		insertDB(wfoSchema);
		console.log(message);
	},
};
