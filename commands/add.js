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
            connectionString: process.env.DATABASE_URL,
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
