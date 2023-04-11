const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const now = new Date();
let hour = now.getHours();
let minute = now.getMinutes();
// 2 Digits hour & minutes
hour = hour <= 9 ? '0' + hour : hour;
minute = minute <= 9 ? '0' + minute : minute;

const zone = (now.getTimezoneOffset() / 60) * -1;

const unixTime = (Date.now() / 1000) | 0;
const timestamp = `<t:${unixTime}:t> - <t:${unixTime}:d>`;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('out')
		.setDescription('Selesai Bekerja'),
	async execute(interaction) {
		const message = `[SIGN OUT]: ${interaction.user.tag} - ${hour}:${minute} [GMT]: ${zone}`;

		const output = new EmbedBuilder()
			.setTitle('SIGN IN')
			.setColor('Red')
			.addFields({
				name: 'User',
				value: `<@${interaction.user.id}>`,
				inline: true,
			})
			.addFields({
				name: 'Signed Out:',
				value: `${timestamp}`,
				// value: `${hour}:${minute}`,
				inline: true,
			});

		await interaction.reply({ embeds: [output] });
		console.log(message);
	},
};
