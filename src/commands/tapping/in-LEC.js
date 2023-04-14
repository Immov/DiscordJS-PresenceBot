const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const tap = require('../../models/tap');
const { insertDB } = require('../../functions/insertDB');
const { lookupName } = require('../../functions/lookupUser');

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
		const now = new Date();
		const zone = (now.getTimezoneOffset() / 60) * -1;
		const unixTime = (Date.now() / 1000) | 0;
		const timestamp = `<t:${unixTime}:t> - <t:${unixTime}:d>`;

		const longName = await lookupName(interaction.user.id);
		const img = interaction.options.getAttachment('proof').url;
		const message = `[SIGN IN][LEC]: ${
			interaction.user.id
		} - ${now.getHours()}:${now.getMinutes()} [GMT]: ${zone} [PROOF]: ${img}`;
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
			})
			.setImage(img);

		const wfoSchema = new tap({
			userID: interaction.user.id,
			fullName: longName,
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
