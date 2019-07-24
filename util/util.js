const Discord = require('discord.js')
const chalk = require('chalk')

var Message
var Client

module.exports = {
    init(client) {
        Client = client

    },

    onMessage(message) {
        Message = message
    },

    send(content, options) {
        Message.channel.send(content, options)
    },

    //user utilities        
    getUserName(message = Message) {
        return message.author.username
    },

    getUserTag(message = Message) {
        return message.author.tag
    },

    getUserID(message = Message) {
        return message.author.id
    },
}