const Discord = require('discord.js')
const fs = require('fs')
const { init: dbInit } = require('../database/petdb')

let Client
let cooldowns = new Discord.Collection()


/**
 *
 *
 */
const CmdExecute = function () {
}



/**
 *
 *
 * @param {Discord.Message} message
 * @param {Array} args
 */
// CmdExecute.prototype


module.exports = {
    async init(client) {
        Client = client
        await dbInit()
        await this.initCommands()
    },

    //ANCHOR Init Commands
    initCommands() {
        Client.commands = new Discord.Collection()
        const command_files = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

        for (const file of command_files) {
            const command = require(`../commands/${file}`)
            Client.commands.set(command.name, command)
        }
    },

    getCommand(name) {
        return Client.commands.get(name) || Client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(name))
    },


    /**
     *
     *
     * @returns CmdExecute
     */
    createCommand() {
        return new CmdExecute
    },


    //ANCHOR CoolDown Check
    getCoolDown(command, id) {
        //Check if cooldowns has this command
        //If not then add it
        if (!cooldowns.has(command.name))
            cooldowns.set(command.name, new Discord.Collection())

        //Get the current time
        const now = Date.now()

        //Get the commands timestamps
        const timestamps = cooldowns.get(command.name)

        //Get the commands cooldown
        //Or set it to 3 if it does not have a cooldown set
        const command_cooldown = (command.cooldown || 3) * 1000

        //Check if user has a timestamp
        //If not add a timestamp and return
        if (!timestamps.has(id)) {
            timestamps.set(id, now)
            setTimeout(() => timestamps.delete(id), command_cooldown)
            return
        }

        //Set the time to expire to the now + the commands cooldown amount
        const cd_expire = timestamps.get(id) + command_cooldown


        //Time left till cool_down
        const timeleft = cd_expire - now

        //Return time left
        return (cd_expire - now) / 1000
    }
}