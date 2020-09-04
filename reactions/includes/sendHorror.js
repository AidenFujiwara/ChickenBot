const Discord = require('discord.js');
let NighthiraethID = "517194930024874000";
module.exports = {
    name: 'Send Horror',
    trigger: "manga",
	description: "temp",
	execute(msg, args){
        if(msg.author.id === NighthiraethID){
            const scaryMomo = new Discord.MessageEmbed()
                .setColor('#FFFF00')
                .setImage('https://i.imgur.com/Dp1agFS.png');

            const scary2 = new Discord.MessageEmbed()
                .setColor('FFFF00')
                .setImage('https://i.imgur.com/LiL4ND0.png');

            const scary3 = new Discord.MessageEmbed()
                .setColor('#FFFF00')
                .setImage('https://i.imgur.com/CqHHStl.png');

            msg.reply(scaryMomo)
                .then(msg => {
                msg.delete( {timeout: 5000} )
            })

            msg.reply(scary2)
                .then(msg => {
                msg.delete( {timeout: 5000} )
            })

            msg.reply(scary3)
                .then(msg => {
                msg.delete( {timeout: 5000} )
            })
        }
	},
};