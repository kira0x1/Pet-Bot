const log = console.log;
const Discord = require('discord.js');
const { createCommand } = require('../util/cmd-util')
const chalk = require('chalk')


module.exports = {
    name: 'help',
    description: 'List all commands',
    aliases: ['h'],
    cooldown: 3,
    usage: '<command>',
    guildOnly: true,
    args: false,

    /**
     *
     *
     * @param {Discord.Message} message
     * @param {Array} args
     */

    async execute(message, args) {
        const commands = message.client.commands;
        let embed = new Discord.RichEmbed()

        commands.map(cmd => {
            if (cmd.aliases)
                embed.addField(`${cmd.name} aliases: ${cmd.aliases.map(al => `\`${al}\``)}`, `\u200b`)
        })

        message.channel.send(embed)
    }
}