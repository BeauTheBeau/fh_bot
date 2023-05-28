require('dotenv').config()

const {Client, GatewayIntentBits, Collection} = require('discord.js')
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
            GatewayIntentBits.GuildPresences
        ]
});
client.commands = new Collection();

// Check if .txt exists
if (!fs.existsSync('.env')) {
    console.log('No .env file found, creating one')
    fs.writeFileSync('.env', `TOKEN=""\nMONGO_URI=""`)
    console.log('Created .env file, please fill in the token and Mongo URI. Make sure not to commit the .env file to VCS')
    process.exit()
}

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