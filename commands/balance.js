const Discord = require('discord.js');
const { Client } = require('pg');
module.exports = {
	name: 'balance',
	description: "sends the user's balance",
	execute(msg, args) {
        const userMentioned = msg.mentions.users.first();
        
        const userID = userMentioned ? userMentioned.id : msg.author.id;
        const SQLClient = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            }
        });
        SQLClient.connect();

        const queryAddUserIfNoExist = `
            INSERT INTO usersEconomy (userID, balance) 
            values ($1, 0) on conflict (userID) do nothing;
        `;
        const valuesAddUserIfNoExist = [userID];
        SQLClient.query(queryAddUserIfNoExist, valuesAddUserIfNoExist)
        .then(res =>{
            const queryGetBalance = `
                SELECT balance FROM usersEconomy WHERE userID = $1;
            `;
            const valuesGetBalance = [userID];
            SQLClient.query(queryGetBalance, valuesGetBalance)
            .then(res => {
                msg.channel.send(`<@${userID}> has ${res.rows[0].balance}`);
                SQLClient.end();
            })
            .catch(e => {
                console.log(e);
                SQLClient.end();
            })
        })
        .catch(e => {
            console.log(e.stack);
            SQLClient.end();
        })
    },
}
