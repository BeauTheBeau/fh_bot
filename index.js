const {Client, GatewayIntentBits} = require('discord.js')
const fs = require('fs') 

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

//.env has not been created for token yet
