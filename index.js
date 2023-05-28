require('dotenv').config()

const {Client, GatewayIntentBits} = require('discord.js')
const fs = require('fs')
const token = process.env.TOKEN

const client = new Client({
    intents:
        [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildIntegrations,
            GatewayIntentBits.GuildMessageReactions,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildPresences,
        ]
});

client.commands = new Collection();

const functionFolders = fs.readdirSync(`./functions`);
for (const folder of functionFolders) {
    const functionFolders = fs
        .readdirSync(`./functions/${folder}`)
        .filter((file) => file.endsWith(".js"));
    for (const file of functionFolders)
        require(`./functions/${folder}/${file}`)(client);
}


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.login(token)