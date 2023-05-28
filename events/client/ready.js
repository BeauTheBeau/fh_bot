const { ActivityType } = require("discord.js");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    const guild = client.guilds.cache.get(`1074941051300753460`)
    
    const statusArray = [
      {
        type: ActivityType.Playing,
        content: "Military War Tycoon",
      },
      {
        type: ActivityType.Playing,
        content: "Roblox",
      },
      {
        type: ActivityType.Watching,
        content: `Over ${guild.memberCount} members in the FH!`,
      },
    ];

    async function pickPresence() {
      const option = Math.floor(Math.random() * statusArray.length);
      client.user.setStatus("online");
      try {
        await client.user.setPresence({
          activities: [
            {
              name: statusArray[option].content,
              type: statusArray[option].type,
            },
          ],
        });
      } catch (error) {
        console.error(error);
      }
    }

    setInterval(pickPresence, 8 * 1000);
    console.log(`${client.user.username} is ready`)
  },
};