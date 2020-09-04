let NanoDude257ID = "147455895914151939";
module.exports = {
	name: 'reset',
	description: "resets the nickname of both the replaced user and the bot",
	execute(msg, args){
		var person = msg.mentions.users.first(); 
        if(person){
            var guildPerson = msg.guild.member(person);
            guildPerson.setNickname(null);
        }
        else{
            msg.reply("You didn't mention anyone");
        }
        msg.guild.me.setNickname(null);
	},
};