require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();

const fs = require('fs');

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.reactionsStartsWith = new Discord.Collection();
client.reactionsIncludes = new Discord.Collection();
client.reactionsEquals = new Discord.Collection();


const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const reactionsStartsWithFiles = fs.readdirSync('./reactions/startsWith').filter(file => file.endsWith('.js'));
const reactionsIncludesFiles = fs.readdirSync('./reactions/includes').filter(file => file.endsWith('.js'));
const reactionsEqualsFiles = fs.readdirSync('./reactions/equals').filter(file => file.endsWith('.js'));

prefix = ".";
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

for(const file of reactionsStartsWithFiles){
    const reactionsStartsWith = require(`./reactions/startsWith/${file}`);
    client.reactionsStartsWith.set(reactionsStartsWith.trigger, reactionsStartsWith);
}

for(const file of reactionsIncludesFiles){
    const reactionsIncludes = require(`./reactions/includes/${file}`);
    client.reactionsIncludes.set(reactionsIncludes.trigger, reactionsIncludes);
}

for(const file of reactionsEqualsFiles){
    const reactionsEquals = require(`./reactions/equals/${file}`);
    client.reactionsEquals.set(reactionsEquals.trigger, reactionsEquals);
}

bot.login(process.env.envTOKEN);

bot.on('ready', () => {
    console.log(`Logged in as Chicken Bot!`);
    bot.user.setActivity("as a very important bot", {
        type: "PLAYING",
    });
});

bot.on('message', msg => {
    if(msg.author.bot){
        return;
    }
    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    if(msg.content.startsWith(prefix)){
        try {
            client.commands.get(command).execute(msg, args);
        }   catch (error) {
            console.error(error);
            msg.reply('there was an error trying to execute that command!');
        }
    }
    else{
        client.reactionsStartsWith.forEach((reactionsStartsWith, reactionsStartsWithTrigger) => {
            if(msg.content.startsWith(reactionsStartsWithTrigger)){
                try{
                    client.reactionsStartsWith.get(reactionsStartsWithTrigger).execute(msg, args);
                }   catch (error){
                    console.error(error);
                    msg.reply('there was an error trying to execute that command!');
                }
            }
        });
        client.reactionsIncludes.forEach((reactionsIncludes, reactionsIncludesTrigger) =>{
            if(msg.content.includes(reactionsIncludesTrigger)){
                try{
                    client.reactionsIncludes.get(reactionsIncludesTrigger).execute(msg, args);
                }   catch (error){
                    console.error(error);
                    msg.reply('there was an error trying to execute that command!');
                }
            }
        });
        client.reactionsEquals.forEach((reactionsEquals, reactionsEqualsTrigger) =>{
            if(msg.content === reactionsEqualsTrigger){
                try{
                    client.reactionsEquals.get(reactionsEqualsTrigger).execute(msg, args);
                }   catch (error){
                    console.error(error);
                    msg.reply('there was an error trying to execute that command!');
                }
            }
        });
    }
});
bot.on('voiceStateUpdate', (oldMember, newMember) => {
    let newUserChannel = newMember.channel;
    let oldUserChannel = oldMember.channel;

    //console.log(`${newMember.member.user.username} has joined ${newUserChannel.name} id: ${newUserChannel.id}`);
    //console.log(oldUserChannel);

    //whenever someone joins a voice call
    /*if(oldUserChannel === null && newUserChannel !== null){
        //specifc users
        if(newMember.member.id === BluedawwnID || newMember.member.id === NighthiraethID){
            newUserChannel.join().then(connection => {
                const stream = ytdl('https://www.youtube.com/watch?v=KA_ldfvVyX8', { filter: 'audioonly' });
                const dispatcher = connection.play(stream);
            });
        }
    }
    else if((oldUserChannel !== newUserChannel) && (newUserChannel !== null) && (newMember.member.id === BluedawwnID || newMember.member.id === NighthiraethID) ){
        newUserChannel.join();
    }
    else if((oldUserChannel !== null) && (newUserChannel === null) && (newMember.member.id === BluedawwnID || newMember.member.id === NighthiraethID)){
        oldUserChannel.leave();
    }*/
});
		
