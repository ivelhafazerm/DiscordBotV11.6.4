module.exports = {
  name: 'anon',
  description: 'send msg anonymous',
  async execute(message, args) {
    const Discord = require('discord.js');
    const anonChannel = ['1188023810906136697', '1194442623365156944'];
    const footer = 'This bot made by @ivelhaf02';
    let content = args.join(' ');
    const currentDate = new Date();

    if (!args.length === 0) {
      message.channel.send("put any messages please");
      return;
    }

    if (!anonChannel.includes(message.channel.id)) {
      const wrongAnon = new Discord.RichEmbed()
        .setColor('#ff0000')
        .setTitle('Invalid Channel')
        .setDescription('Please use the `anon` command in one of the designated channels. <#1194442623365156944> or <#1188023810906136697>')
        .setFooter(`${footer}`)
        .setTimestamp();
      message.channel.send(wrongAnon)
        .then(sentMessage => {
          setTimeout(() => {
            sentMessage.delete().catch(console.error);
            message.delete().catch(console.error);
          }, 2500);
        });
      return;
    }
    const attachment = message.attachments.first();
    if (attachment) {
      content += `\n${attachment.url}`;
      message.channel.send(`__Anonymous messages:__ \n\n${content}`);
    } else {
      message.channel.send(`__Anonymous messages:__ \n\n${content}`);
    }

    message.delete()
      .then(msg => console.log(`Deleted message from ${msg.author.username} ${currentDate.toString().split(' ')[4]}`))
      .catch(console.error);
  },
};
