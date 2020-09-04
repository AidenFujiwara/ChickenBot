module.exports = {
    name: 'All My Friends Have Left Me',
    trigger: "all my friends have left me",
	description: "temp",
	execute(msg, args){
        var number = Math.random();
        if(number < 0.5){
            if(msg.member.voice.channel){
                msg.channel.send(`It\'s okay ${msg.author}. I\'ll never leave you.`);
                if(!msg.guild.me.voice.channel){
                msg.member.voice.channel.join();
                }
            }
            else {
                msg.channel.send(`It\'s okay ${msg.author}. I\'ll be your friend.`);
            }
        }
        else if (number >= 0.5){
        msg.reply("What are you talking about? You've never had any friends :smiley:");
        }
	},
};