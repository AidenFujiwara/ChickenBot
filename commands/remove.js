const Discord = require('discord.js');
const { Client } = require('pg');
module.exports = {
	name: 'remove',
	description: "remove money to a user's balance",
	execute(msg, args) {
        const userMentioned = msg.mentions.users.first();
        var userID = userMentioned ? userMentioned.id : msg.author.id;
        const balanceToRemove = args[0];

        const balanceToRemoveInt = parseInt(balanceToRemove,10);
        if(isNaN(balanceToRemoveInt)){
            msg.reply("please enter a valid amount");
            return;
        }
        else if(balanceToRemoveInt > 10000){
            msg.reply("Until fix edge cases, you can only remove up to 10000 lol");
            return;
        }
        else if(balanceToRemoveInt < 0){
            msg.reply("Use .add to add ");
            return;
        }

        const SQLClient = new Client({
            connectionString: 'postgres://wyllaangmnljqg:11b121a9870d5015da97041337a5d79fb276c96dc52545b153fb2ec40b945e6d@ec2-3-208-50-226.compute-1.amazonaws.com:5432/d98sn7du51h3gh',
            ssl: {
                rejectUnauthorized: false
            }
        });
        SQLClient.connect();

        const queryRemove = `
        INSERT INTO usersEconomy (userID, balance) 
        values ($1, $3) ON CONFLICT (userID) do UPDATE
        SET balance = usersEconomy.balance - $2
        WHERE usersEconomy.userID = $1;
        `;
        const zeroMinusBalanceToRemoveInt = 0 - balanceToRemoveInt;
        const values = [userID, balanceToRemoveInt, zeroMinusBalanceToRemoveInt];
        SQLClient.query(queryRemove, values)
        .then(res =>{
            msg.channel.send(`${balanceToRemoveInt} has been removed to <@${userID}>`);
            SQLClient.end();
        })
        .catch(e => {console.log(e.stack)
            msg.channel.send(`Something went right. It's a feature, not a bug.`);
            SQLClient.end();
        });
    },
}