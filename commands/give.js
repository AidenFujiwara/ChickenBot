const Discord = require('discord.js');
const { Client } = require('pg');
module.exports = {
	name: 'give',
	description: "gives another use money",
	execute(msg, args) {
        const userMentioned = msg.mentions.users.first();
        if(!userMentioned){
            msg.reply("Please mention a valid user");
            return;
        }
        const userMentionedID = userMentioned.id;
        const messageAuthorUserID = msg.author.id;
        const balanceToGive = args[0];

        const balanceToGiveInt = parseInt(balanceToGive,10);
        if(isNaN(balanceToGiveInt)){
            msg.reply("please enter a valid amount");
            return;
        }
        else if(balanceToGiveInt > 10000){
            msg.reply("Until fix edge cases, you can only give up to 10000 lol");
            return;
        }
        else if(balanceToGiveInt < 0){
            msg.reply("You can't give someone a negative amount");
            return;
        }
        const SQLClient = new Client({
            connectionString: 'postgres://wyllaangmnljqg:11b121a9870d5015da97041337a5d79fb276c96dc52545b153fb2ec40b945e6d@ec2-3-208-50-226.compute-1.amazonaws.com:5432/d98sn7du51h3gh',
            ssl: {
                rejectUnauthorized: false
            }
        });
        SQLClient.connect();

        const queryTake= `
            INSERT INTO usersEconomy (userID, balance) 
            values ($1, $2) ON CONFLICT (userID) do UPDATE
            SET balance = usersEconomy.balance + $2
            WHERE usersEconomy.userID = $1;
        `;
        const balanceToTakeInt = 0 - balanceToGiveInt;
        const valuesToTake = [messageAuthorUserID, balanceToTakeInt];
        
        SQLClient.query(queryTake, valuesToTake)
        .then(res =>{
            const queryGive = `
                INSERT INTO usersEconomy (userID, balance) 
                values ($1, $2) ON CONFLICT (userID) do UPDATE
                SET balance = usersEconomy.balance + $2
                WHERE usersEconomy.userID = $1;
            `;
            const valuesToGive = [userMentionedID, balanceToGiveInt];
            SQLClient.query(queryGive, valuesToGive)
            .then(res =>{
                msg.channel.send(`<@${messageAuthorUserID}> has given ${balanceToGiveInt} to <@${userMentionedID}>`);
            })
            .catch(e => {
                console.log(e.stack)
                msg.channel.send(`Something went right. It's a feature, not a bug.`);
            })
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
