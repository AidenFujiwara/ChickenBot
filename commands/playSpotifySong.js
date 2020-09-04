search = require('youtube-search');
ytdl = require('ytdl-core-discord');
module.exports = {
	name: 'spotify',
	description: "Plays the spotify song that the user is currently listening to",
	execute(msg, args) {
		var spotifyActivity = msg.author.presence.activities.filter(activity => activity.type === 'LISTENING' && activity.name === 'Spotify')
        if(spotifyActivity[0] == undefined){
            msg.reply("You aren't listening to a song on Spotify!");
            return;
        }
        var songName = spotifyActivity[0].details;
        var bandName = spotifyActivity[0].state;
        var opts = {
            maxResults: 1,
            key: process.env.youtubeV3APIKey
        };
        search(`${songName} by ${bandName}`, opts, async function(err, results) {
            if(err){
                msg.reply(`Yo, chill bro, I haven't set up a queue system yet`);
            console.log(err)
            return;
            }
            songLink = results[0].link;
            if(msg.member.voice.channel){
                if(!msg.guild.me.voice.channel){
                    connection = await msg.member.voice.channel.join()
                }
                async function play(connection, url) {
                    connection.play(await ytdl(url), { type: 'opus', volume: '0.03', filter: 'audioonly'});
                }
                play(connection, songLink);
                msg.reply(`Playing ${songName} by ${bandName}`);
            }
            else{
                msg.reply(`Join a voice channel so I can play the song!`);
            }
        });  
	},
};
