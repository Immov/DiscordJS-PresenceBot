const {
	SlashCommandBuilder,
	EmbedBuilder,
	PermissionFlagsBits,
} = require('discord.js');
const { renew } = require('../../functions/renew');
const assign_user = require('../../models/users_name');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('assign-user')
		.setDescription('Assign User ID sesuai Nama lengkap')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
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
		const longName = interaction.options.get('name')?.value;
		const message = `[USR] ${target} has been assigned as ${longName}`;
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
				value: `${longName}`,
				inline: true,
			});

		const assignSchema = new assign_user({
			userID: target,
			fullName: longName,
		});

		await interaction.reply({ embeds: [output] });
		renew(target, assignSchema);
		console.log(message);
	},
};
