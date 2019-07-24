const Discord = require("discord.js");
const dbUtil = require("../util/pet-util");

module.exports = {
    name: "pets",
    description: "my pets",
    aliases: ["p"],
    cooldown: 0.1,
    guildOnly: true,
    args: false,

    /**
     *
     *
     * @param {Discord.Message} message
     * @param {Array} args
     */
    async execute(message, args) {
        //List players pets
        await dbUtil.addUserPet(message.author.id, 54)
        // const res = await dbUtil.getUserPets(message.author.id);

        // console.dir(res)
    }
};
