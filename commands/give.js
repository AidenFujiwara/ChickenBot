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
            connectionString: process.env.DATABASE_URL,
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
                SQLClient.end();
            })
            .catch(e => {
                console.log(e.stack)
                msg.channel.send(`Something went right. It's a feature, not a bug.`);
                SQLClient.end();
            })
        })
        .catch(e => {
            console.log(e.stack)
            msg.channel.send(`Something went right. It's a feature, not a bug.`);
            SQLClient.end();
        })
    },
}
