require("dotenv").config();
const nodeFetch = require("node-fetch");
const Discord = require("discord.js");

//bot
const client = new Discord.Client();

//api call
const insultApi = async ()=>{
    const data = await nodeFetch("https://insult.mattbas.org/api/insult.json");
    
    const res = await data.json();
    // console.log(res);
    return res;
}

client.login(process.env.DISCORD_TOKEN);

const regex = /(.+)?<@!?425643006813536286>(.+)?/;

client.on("message",async (message)=>{
    const msg = message.content;

    // !@username will send an insult msg to that username
    if(msg.charAt(0)==='!'){
        const user = msg.substr(1,msg.length);
        // console.log(msg);
        if(user.match(regex)){
            message.reply(`you should not insult ${user}.`)
        }else{
            const {insult} = await insultApi();
            message.channel.send(`${user} \n ${insult}`);
        }
    }
})

