const { REST } = require(`@discordjs/rest`);
const { Routes } = require(`discord-api-types/v9`);
const fs = require("fs");
const token = process.env.TOKEN

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync(`./commands`);
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./commands/${folder}`)
        .filter((file) => file.endsWith(`.js`));
      const { commands, commandArray } = client;
      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        if (command.data.name) {
          commands.set(command.data.name, command);
        } else {
          continue;
        }
        commandArray.push(command.data.toJSON());
      }
    }
    console.log(table.toString());

    const clientId = "1112200826006548521";
    const guildId = "1074941051300753460";
    const rest = new REST({ version: "9" }).setToken(token);
    try {
      await rest.put(Routes.applicationCommands(clientId, guildId), {
        body: client.commandArray,
      });
      console.log(`Successfully reploaded application (/) commands.`);
    } catch (error) {
      console.error(error);
    }
  };
}