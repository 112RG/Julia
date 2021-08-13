const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('verify')
    .setDescription('Verifies you as a student')
    .addStringOption(option => option.setName('student_id').setDescription('Enter your Student ID')),
  async execute(interaction) {
    const studentRole = interaction.member.guild.roles.cache.find(role => role.name === 'Student')
    const studentId = interaction.options.getString('student_id')
    if (!studentId) return interaction.reply('Please input your Student ID')

    if (interaction.member.roles.cache.has(studentRole.id)) {
      return interaction.reply('You are already verified')
    } else {
      return interaction.reply('Sorry we can\'t verify your Student ID')
    }
  }
}
