const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const tap = require('../../models/tap');
const { insertDB } = require('../../utils/insertDB');
const { lookupName } = require('../../utils/lookupUser');
const { getFormattedTimestamp } = require('../../utils/dateUtils');

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
		const timestamp = getFormattedTimestamp();

		const longName = await lookupName(interaction.user.id);
		const img = interaction.options.getAttachment('proof').url;
		const message = `[SIGN IN][LEC]: ${
			interaction.user.id
		} ${new Date().getHours()}:${new Date().getMinutes()} [PROOF]: ${img}`;
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
				inline: true,
			})
			.setImage(img);

		const wfoSchema = new tap({
			userID: interaction.user.id,
			fullName: longName,
			tap: `in-lec`,
			date: new Date(),
			proofURL: img,
			hour: new Date().getHours(),
			minute: new Date().getMinutes(),
		});
		await interaction.reply({ embeds: [output] });
		insertDB(wfoSchema);
		console.log(message);
	},
};
