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
            connectionString: process.env.DATABASE_URL,
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
            msg.channel.send(`${balanceToRemoveInt} has been removed from <@${userID}>`);
        })
        .catch(e => {console.log(e.stack)
            msg.channel.send(`Something went right. It's a feature, not a bug.`);
        })
        .finally(()=>{
            SQLClient.end();
        })
    },
}
