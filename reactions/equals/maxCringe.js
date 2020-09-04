const Discord = require('discord.js');
module.exports = {
	name: 'maxcringe',
	trigger: 'maxcringe',
	description: "Sends a picture of max with bottom text: Max Ward is cringing at you.",
	execute(msg, args) {
		const maxCringe =new Discord.MessageEmbed()
            .setColor('#FFFF00')
            .setImage('https://i.imgur.com/cOL4URv.png');
        msg.channel.send(maxCringe);
	},
};