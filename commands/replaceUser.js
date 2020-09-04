let NanoDude257ID = "147455895914151939";
module.exports = {
	name: 'replace',
	description: "replaces the first mentioned user with the chicken bot disguised as the user",
	execute(msg, args) {
		var person = msg.mentions.users.first();
        var personUsername = person.username
        var guildPerson = msg.guild.member(person);
        if(person.id === NanoDude257ID){
            msg.channel.send('AHAHAHAHAHA. Good try though.');
        }
        else if(guildPerson.voice.channel){
            guildPerson.voice.channel.join();
            guildPerson.voice.kick();
            guildPerson.setNickname(`Chicken Bot`);
            msg.channel.send(`Hello guys. It\'s me, ${personUsername}.`);
            msg.guild.me.setNickname(person.username);
            msg.member.voice.channel.join();
        }
        else{
            msg.channel.send(`${person} isn't in a voice call and cannot be replaced.`);
        }
	},
};