const Discord = require('discord.js');
let CataclysmID = "190818168908939264";
module.exports = {
    name: 'rauPictures',
    trigger: "p!trivia hard",
	description: "temp",
	execute(msg, args){
        if(msg.author.id === CataclysmID){
        const AlexRau = new Discord.MessageEmbed()
            .setColor('#FFFF00')
            .setImage('https://i.imgur.com/kGppByG.png');
        for(i = 0; i < 5; i++){
            msg.channel.send(AlexRau)
            .then(msg => {
            msg.delete( {timeout: 10000} )
            })
        }
        }
	},
};