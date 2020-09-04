const Discord = require('discord.js');

module.exports = {
    name: 'listening',
    trigger: "listen",
	description: "temp",
	execute(msg, args){
        msg.reply("listening");
	},
};