const { Client, GatewayIntentBits } = require('discord.js');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
    if(!message.author.bot && message.channel.id === "1307731488862634025" && message.content.charAt(0) !== ".") {
        await message.channel.sendTyping();

        const result = await model.generateContent(message.content);
        message.reply(result.response.text());
    }
});

client.login(process.env.DISCORD_TOKEN);