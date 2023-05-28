const {Client, GatewayIntentBits} = require('discord.js')

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

//.env has not been created for token yet
