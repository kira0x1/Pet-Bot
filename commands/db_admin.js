const Discord = require('discord.js')

module.exports = {
    name: 'dbAdmin',
    description: 'database commands',
    aliases: ['db'],
    cooldown: 3,
    guildOnly: true,
    args: true,

    /**
     *
     *
     * @param {Discord.Message} message
     */

    async execute(message, args) {
        const cmd = args.shift().toLowerCase()
    }
}