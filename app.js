const Discord = require('discord.js')
const chalk = require('chalk')
const util = require('./util/util')

//NOTE Get token and prefix from config.json
const { token, prefix } = require('./config')

//Create client from discord.js
const Client = new Discord.Client()

//Set console.log to log for convienience
const log = console.log

//ANCHOR Ready
Client.once('ready', async () => {
    await util.initCommands(Client)
    log(chalk`{bold ${Client.user.username} Online!}`)
})


//ANCHOR Message
Client.on('message', async message => {
    //NOTE Ignore the message if it comes from a bot,
    //Or if it doesnt start with the assigned prefix

    if (message.author.bot || !message.content.startsWith(prefix))
        return

    //Remove prefix, and split the message
    const args = message.content.slice(prefix.length).split(/ +/)

    //Set the first argument given as the command name
    //Set it to lowercase and 'shift' it out of args (Which essentialy removes it from args)
    const command_name = args.shift().toLowerCase()

    //NOTE Get Command
    const command = util.getCommand(command_name)

    //NOTE if the command doesnt exist the exit out
    if (!command)
        return log(chalk`{red.bold Command} {bold ${command_name}} {red.bold does not exist}`)

    //Check if command is not supposed to be used by a user
    if (command.helper) return console.log(`helper command '${command.name}' tried to be called by: ${message.author.username}`)

    //NOTE Check if command needs arguments
    if (command.args && !args.length) {
        return message.reply(util.usage(command))
    }

    //NOTE Check if guild only
    if (command.guildOnly && message.channel.type !== 'text')
        return message.reply("That command cannot be used inside of dm's")

    //NOTE  Get commands cooldown
    const cooldown = util.getCoolDown(command, message.author.id)

    // Check if command is on cooldown
    if (cooldown)
        return message.reply(`Command on cooldown. Cooldown: ${cooldown.toFixed(1)} second(s)`)


    //ANCHOR Execute
    try {
        await command.execute(message, args)
    } catch (error) {
        console.error(error)
        message.reply('error trying to call command')
    }
})

//ANCHOR Login
Client.login(token)