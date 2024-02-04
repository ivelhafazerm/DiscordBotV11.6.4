const dotenv = require('dotenv');
dotenv.config();
const fs = require('fs');
const { Client, Intents } = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
bot.commands = new Discord.Collection();
const token = process.env.token;
const prefix = "+";

const commandFolders = fs.readdirSync('./commands').filter(folder => fs.statSync(`./commands/${folder}`).isDirectory());

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        bot.commands.set(command.name, command);
    }
}

bot.once("ready", () => {
    console.log(`${bot.user.username} Is Now Online`);
    const Text = "my prefix is '+'";
    bot.user
        .setActivity(Text, { type: "WATCHING" })
});
//Welcome msg
bot.on("guildMemberAdd", (member) => {
    // Assuming "1195598335743103097" is the channel ID
    const welcomeChannelId = process.env.welcomChannel;
    const welcomeText = `>>> What is good <@${member.user.id}> \n\nWelcome to ___Ahjin DAO___  \n\nverify ur self here <#1187000354710237239> type **+verify** `;
    // Get the channel object using the ID
    const welcomeChannel = member.guild.channels.get(welcomeChannelId);
    // Check if the channel object is found
    if (welcomeChannel) {
        welcomeChannel.send(welcomeText);
    } else {
        console.error("Welcome channel not found.");
    }
});

//========================= Command =============================
bot.on("message", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();

    if (!bot.commands.has(commandName)) return;

    const command = bot.commands.get(commandName);

    try {
        command.execute(message, args, bot);
    } catch (error) {
        console.error(error);
        message.reply('There was an error executing that command.');
    }


});

bot.login(token);
