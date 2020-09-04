let NanoDude257ID = "147455895914151939";
module.exports = {
	name: 'ping',
	description: "Pings the first user tagged 10 times",
	execute(msg, args) {
        user = msg.mentions.users.first();
		if(user){  
            if(user.id === NanoDude257ID){
                for(i=0;i<10;i++){
                    msg.reply('Nice try bud');
                }
                
            }
            else{
                for(i=0;i<10;i++){
                msg.channel.send(`hi ${user}`);
                }
            }
        }
        else{
            msg.reply("You didn't mention a valid user to ping");
        }
	},
};