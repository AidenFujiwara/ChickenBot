const Discord = require('discord.js');
module.exports = {
	name: 'avatar',
	description: "Sends a picture of the mentioned user's avatar",
	execute(msg, args) {
        if(msg.mentions.users.first()){
            person = msg.mentions.users.first();
        }
        else{
            person = msg.author;
        }
        if(person){
            const avatarEmbed = new Discord.MessageEmbed()
                .setColor('#FFFF00')
                .setImage(person.displayAvatarURL())
                .setFooter(`${person.username}'s avatar`)
            msg.channel.send(avatarEmbed);
        }
        else{
            msg.reply("please choose a valid user");
        }
    },
}
