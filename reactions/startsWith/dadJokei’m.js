module.exports = {
    name: "dadJokei'm",
    trigger: "i’m ",
	description: "temp",
	execute(msg, args){
        userMessage = msg.content;
        msg.reply('Hi ' + userMessage.substring(4,userMessage.length) + '. I\'m dad');        
	},
};