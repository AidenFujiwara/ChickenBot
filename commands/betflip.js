const Discord = require('discord.js');
const { Client } = require('pg');
module.exports = {
	name: 'betflip',
	description: "flip a coin, if heads, double the bet, if tails, lose all.",
	execute(msg, args) {
        const betAmount = args[0];
        var userID = msg.author.id;

        var random = Math.random();
        var win = (random > 0.5);

        const betAmountInt = parseInt(betAmount, 10);
        if(isNaN(betAmountInt)){
            msg.reply("please enter a valid amount");
            return;
        }
        else if(betAmountInt > 10000){
            msg.reply("Until fix edge cases, you can only add up to 10000 lol");
            return;
        }
        else if(betAmountInt < 0){
            msg.reply("You can't bet negative money");
            return;
        }
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
            .then(result => {
                var balance = result.rows[0].balance;

                if(balance >= betAmountInt){
                    const userIDString = `${userID}`;
                    if(win){
                        const balancePlusBet = balance + betAmountInt;
                        const queryAddWinning = `
                        UPDATE usersEconomy 
                        SET balance = $2
                        WHERE userID = $1;
                        `;
                        
                        const valuesAddWin = [userIDString, balancePlusBet];
                        SQLClient.query(queryAddWinning, valuesAddWin)
                        .then(winRes => {
                            msg.reply(`You won ${betAmount} money`);
                            SQLClient.end();
                        })
                        .catch(e => {
                            console.log(e);
                            SQLClient.end();
                        })
                    }
                    else{
                        const balanceMinusBet = balance - betAmountInt;
                        const queryAddWinning = `
                        UPDATE usersEconomy 
                        SET balance = $2
                        WHERE userID = $1;
                        `;
                        const userIDString = `${userID}`;
                        const valuesAddWin = [userIDString, balanceMinusBet];
                        SQLClient.query(queryAddWinning, valuesAddWin)
                        .then(winRes => {
                            msg.reply(`You lost ${betAmount} money`);
                            SQLClient.end();
                        })
                        .catch(e => {
                            console.log(e);
                            SQLClient.end();
                        })
                    }
                }
                else{
                    msg.reply(`You need ${betAmountInt - balance} more money`);
                    SQLClient.end();
                }
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
