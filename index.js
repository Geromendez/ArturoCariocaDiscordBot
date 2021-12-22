const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES", "GUILDS"] });
const DisTube = require('distube');
const distube = new DisTube.DisTube(client, { searchSongs: 5, emitNewSongOnly: true});
const{ token } = require('./info.json');
const prefix = '!';
console.log('Arturito entro al serverrrr');
//client.login{token};


client.once('ready', c => {
	console.log(`Listorti, loggueado como ${c.user.tag}`);
});


console.log("3");

client.on("messageCreate", async (message) => {
    console.log("4");
    if(message.author.bot) return; 
    console.log("5");
    if(!message.content.startsWith(prefix)) return;
    console.log("6");
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    console.log("7");
    const command = args.shift();
    console.log("8");
    const status = queue => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(", ") || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
    //client.distube
    client.on("playSong", (queue, song) => queue.textChannel.send(
        `${client.emotes.play} | Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${status(queue)}`
    ))
    client.on("addSong", (queue, song) => queue.textChannel.send(
        `${client.emotes.success} | Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
    ))
    client.on("addList", (queue, playlist) => queue.textChannel.send(
        `${client.emotes.success} | Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`
    ))
    // DisTubeOptions.searchSongs = true
    
    client.on("searchNoResult", () => {
        message.channel.send("No encontre nada pa tu busqueda capo");
    })

    client.on("searchResult", (message, result) => {
        let i = 0
        message.channel.send(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`)
    })
    client.on("searchInvalidAnswer", () => {})
    client.on("searchDone", () => {})
    // DisTubeOptions.searchSongs = true
    client.on("searchCancel", message => message.channel.send(`${client.emotes.error} | Searching canceled`))
    client.on("error", (channel, e) => {
        channel.send(`${client.emotes.error} | An error encountered: ${e}`)
        console.error(e)
    })
    /*
    .on("empty", channel => channel.send("Voice channel is empty! Leaving the channel..."))
    .on("searchNoResult", message => message.channel.send(`${client.emotes.error} | No result found!`))
    .on("finish", queue => queue.textChannel.send("Finished!"))
    */
    if(command == "play"){
        if(!message.member.voice.channel) return message.channel.send("tenes que estar en un chat de voz, no trollees.")
        if(!args[0]) return message.channel.send('tene que poner algo vo sino no anda');
        distube.play(message, args.join(" "))
    }

    if(command == "skip"){
        const bot = message.guild.members.cache.get(client.user.id);
        if(bot.voice.channel !== message.member.voice.channel) return message.channel.send("tenes que estar en el mismo canal que el bot, trolleador cara.")
        distube.stop(message)
        return message.channel.send("eskipeaste cabeza")
    }

    

});
client.login(token)
console.log("ejecuté todo")
