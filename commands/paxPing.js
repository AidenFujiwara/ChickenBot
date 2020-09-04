module.exports = {
	name: 'paxping',
	description: "Sends a message with a random number for pax's ping",
	execute(msg, args) {
		randomNumber = Math.floor(10000*Math.random()+10000);
        msg.channel.send(`Pax's ping is ${randomNumber}ms`);
	},
};