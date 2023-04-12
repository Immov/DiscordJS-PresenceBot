const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { insertDB } = require('../../functions/insertDB');
const assign_user = require('../../models/users_name');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('assign-user')
		.setDescription('Assign User ID sesuai Nama lengkap')
		.addUserOption((option) =>
			option
				.setName('target')
				.setDescription('Target User you want to assign to')
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName('name')
				.setDescription('Nama lengkap user yang akan di assign')
				.setRequired(true)
		),
	async execute(interaction) {
		const target = interaction.options.getUser('target')?.id;
		const fullName = interaction.options.get('name')?.value;
		const message = `[USR] ${target} has been assigned as ${fullName}`;
		const output = new EmbedBuilder()
			.setTitle('Assign user')
			.setColor('Blue')
			.addFields({
				name: 'User:',
				value: `<@${target}>`,
				inline: true,
			})
			.addFields({
				name: 'Full Name:',
				value: `${fullName}`,
				inline: true,
			});

		const assignSchema = new assign_user({
			userID: target,
			fullName: fullName,
		});

		await interaction.reply({ embeds: [output] });
		insertDB(assignSchema);
		console.log(message);
	},
};
