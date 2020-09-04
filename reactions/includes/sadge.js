const Discord = require('discord.js');
module.exports = {
    name: 'sadge',
    trigger: 'sadge',
	description: "sends an image of pax looking sadge",
	execute(msg, args){
		const paxSadge = new Discord.MessageEmbed()
            .setColor('#FFFF00')
            .setImage('https://i.imgur.com/OWsx8nM.png');
        msg.channel.send(paxSadge);
	},
};