module.exports = {
    name: 'poll',
    description: 'send msg anonymous',
    execute(message, args ) {
     const Discord = require("discord.js");
     if (!message.member.hasPermission('MANAGE_MESSAGES')) {
        return message.reply('You do not have permission to create polls.');
      }

      const fullQuestion = args.join(' ');
      const [question, ...options] = fullQuestion.split(',');

      const pollEmbed = new Discord.RichEmbed()
        .setColor('#0099ff')
        .setTitle('New Poll')
        .setDescription(question)
        .addField('Options', options.map((option, index) => `${index + 1}. ${option.trim()}`))
        .setTimestamp();

      message.channel.send(pollEmbed).then((pollMessage) => {
        options.forEach((_, index) => {
          pollMessage.react(`${index + 1}\u20e3`);
        });
      });

      message.delete();
}
}