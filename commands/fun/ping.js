const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Return my ping!")
    .setDMPermission(false),
  async execute(interaction, client) {
    const message = await interaction.deferReply({
      fetchReply: true,
    });

    const embed = new EmbedBuilder()
      .setTitle("Ping")
      .setDescription(
        `API Latency: ${client.ws.ping}\nClient Ping: ${
          message.createTimestamp - interaction.createTimestamp
        }`
      )
      .setColor("Red");
    await interaction.editReply({
      embeds: [embed],
    });
  },
};
