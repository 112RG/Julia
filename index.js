require('dotenv').config()

const { Client, Collection, Intents } = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS] })
const fs = require('fs')
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

client.commands = new Collection()

for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  client.commands.set(command.data.name, command)
  console.log(command.data.name)
}

client.once('ready', () => {
  console.log('Ready!')
})

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) {
    return
  }
  console.log(interaction.commandName)
  if (!client.commands.has(interaction.commandName)) {
    return
  }

  try {
    await client.commands.get(interaction.commandName).execute(interaction)
  } catch (error) {
    console.error(error)
    return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
  }
})
client.login(process.env.TOKEN)
