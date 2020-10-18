const Discord = require('discord.js');
const { Client } = require('pg');
module.exports = {
	name: 'balance',
	description: "sends the user's balance",
	execute(msg, args) {
        const userMentioned = msg.mentions.users.first();
        
        const userID = userMentioned ? userMentioned.id : msg.author.id;
        const SQLClient = new Client({
            connectionString: 'postgres://wyllaangmnljqg:11b121a9870d5015da97041337a5d79fb276c96dc52545b153fb2ec40b945e6d@ec2-3-208-50-226.compute-1.amazonaws.com:5432/d98sn7du51h3gh',
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
            })
            .catch(e => {
                console.log(e);
            })
        })
        .catch(e => {
            console.log(e.stack);
        })
        .finally(() =>{
            SQLClient.end();
        }) 
    },
}
