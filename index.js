const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.DirectMessages] });

// List of banned words
const badWords = ["fuck"];

client.on("messageCreate", async (message) => {
    if (badWords.some(word => message.content.toLowerCase().includes(word))) {
        // Delete the message from the channel
        message.delete();

        // Create an embed message
        const warningEmbed = new EmbedBuilder()
            .setColor("#FF0000") // Red color
            .setTitle("🚫 Warning!")
            .setDescription(`Please do not use forbidden words in **${message.guild.name}**.`)
            .setFooter({ text: "ChatGuard Bot" })
            .setTimestamp();

        try {
            // Send the embed as a DM to the user
            await message.author.send({ embeds: [warningEmbed] });
        } catch (error) {
            console.log(`Could not send DM to ${message.author.tag}.`);
        }
    }
});

client.login("YOUR_BOT_TOKEN");
