const NanoDude257ID = "147455895914151939"; 
const PaxKimID = '330813857796980736';
const BlueDawwnID = '272199948949389312'; 
const ArchenonID = '185537095010353152';
module.exports = {
	name: 'u',
	description: "unmutes all users in a call. Limited by the Discord API rate limit (10 users)",
	execute(msg, args){
        userId = msg.author.id;
        if(userId === NanoDude257ID || userId === PaxKimID || userId === BlueDawwnID|| userId === ArchenonID){
		    var voiceChannel = msg.member.voice.channel;
            if(voiceChannel){
                for (let member of voiceChannel.members) {
                    if(member[1].voice.serverMute === true){
                        member[1].voice.setMute(false);
                    }
                }
            }
            else{
                msg.reply("Join a voice channel so I can mute everyone in it");
            }
        }
        else{
            msg.reply("You don't have permission to use this command");
        }
	},
};