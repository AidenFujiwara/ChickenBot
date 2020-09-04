const Discord = require('discord.js');

module.exports = {
    name: 'yeet',
    trigger: "yeet",
	description: "temp",
	execute(msg, args){
        const sharonHue =new Discord.MessageEmbed()
            .setColor('#FFFF00')
            .setImage('https://i.imgur.com/uqb3MBA.gif');
        msg.reply('you are so cringe');
        msg.channel.send(sharonHue);
	},
};