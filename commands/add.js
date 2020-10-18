const Discord = require('discord.js');
const { Client } = require('pg');
module.exports = {
	name: 'add',
	description: "adds money to a user's balance",
	execute(msg, args) {
        const userMentioned = msg.mentions.users.first();
        var userID = userMentioned ? userMentioned.id : msg.author.id;
        const balanceToAdd = args[0];

        const balanceToAddInt = parseInt(balanceToAdd,10);
        if(isNaN(balanceToAddInt)){
            msg.reply("please enter a valid amount");
            return;
        }
        else if(balanceToAddInt > 10000){
            msg.reply("Until fix edge cases, you can only add up to 10000 lol");
            return;
        }
        else if(balanceToAddInt < 0){
            msg.reply("Use .remove to remove");
            return;
        }
        const SQLClient = new Client({
            connectionString: 'postgres://wyllaangmnljqg:11b121a9870d5015da97041337a5d79fb276c96dc52545b153fb2ec40b945e6d@ec2-3-208-50-226.compute-1.amazonaws.com:5432/d98sn7du51h3gh',
            ssl: {
                rejectUnauthorized: false
            }
        });
        SQLClient.connect();
        
        const queryAdd = `
            INSERT INTO usersEconomy (userID, balance) 
            values ($1, $2) ON CONFLICT (userID) do UPDATE
            SET balance = usersEconomy.balance + $2
            WHERE usersEconomy.userID = $1;
        `;
        const values = [userID, balanceToAddInt]
        
        SQLClient.query(queryAdd, values)
        .then(res =>{
            msg.channel.send(`${balanceToAddInt} has been added to <@${userID}>`);
        })
        .catch(e => {
            console.log(e.stack)
            msg.channel.send(`Something went right. It's a feature, not a bug.`);
        })
	.finally(() =>{
            SQLClient.end();
        })  
    },
}
