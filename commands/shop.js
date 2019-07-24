const { send } = require('../util/util')
const petUtil = require('../util/pet-util')
const Discord = require('discord.js')

const log = console.log
const dir = console.dir

const chalk = require('chalk')

module.exports = {
    name: 'shop',
    description: 'pet shop',
    aliases: ['s'],
    cooldown: 0.1,
    guildOnly: true,

    /**
     *
     *
     * @param {Discord.Message} message
     * @param {Array} args
     */
    async execute(message, args) {
        let pets = await petUtil.getShopPets()

        const embed = new Discord.RichEmbed()
            .setTitle(`Pets`)

        pets.map(p => embed.addField(`\u200b\n${p.name}`, `Costs: ** ${p.cost} ** g`))
        message.channel.send(embed)
    }
}