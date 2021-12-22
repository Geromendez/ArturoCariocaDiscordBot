//aca va el codigo del bot


const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });


client.on("ready", () => {
    console.log("El bot fue iniciado con exito.");
 });
 
 client.on("message", (message) => {
   if(message.content.startsWith("!")) {
     message.channel.send("cosopene");
   }
 
 });
 
 client.login("OTIzMDA5ODgwMzcyMTUwMzMy.YcJx8A.IirxfDs6as0CM-bYex320zXWmCI");