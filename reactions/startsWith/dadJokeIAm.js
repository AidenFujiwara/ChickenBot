module.exports = {
    name: 'dadJokeIAm',
    trigger: "i am ",
	description: "temp",
	execute(msg, args){
        userMessage = msg.content;
        msg.reply('Hi ' + userMessage.substring(5,userMessage.length) + '. I\'m dad');        
	},
};