
module.exports = {
    name: 'dadJokeim',
    trigger: "im ",
	description: "temp",
	execute(msg, args){
        userMessage = msg.content;
        msg.reply('Hi ' + userMessage.substring(3,userMessage.length) + '. I\'m dad');        
	},
};