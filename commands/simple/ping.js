module.exports = {
    name: 'ping',
    description: 'show lattency bot!',
    execute(message, args, bot) {
    const ping = `🏓 ${(bot.ping)}ms 🏓`;

    message.channel.send(ping)
    },
  };
