require("dotenv").config();
const nodeFetch = require("node-fetch");
const Discord = require("discord.js");

//bot
const client = new Discord.Client();

//api call
const insultApi = async ()=>{
    const data = await nodeFetch("https://insult.mattbas.org/api/insult.json");
    
    const res = await data.json();
    console.log(res);
    return res;
}

client.login(process.env.DISCORD_TOKEN);

client.on("message",async (message)=>{
    const msg = message.content;

    // !@username will send an insult msg to that username
    if(msg.length>3 && msg.charAt(0)==='!' && msg.charAt(2)==='@'){
        const user = msg.trim().substr(2,msg.length).split(/\s+/)[0];
        if(user===" @markaksh" || user===" @Aksh"){
            message.reply(`you should not insult ${user}.`)
        }else{
            const {insult} = await insultApi();
            message.channel.send(`${user} \n ${insult}`);
        }
    }
})