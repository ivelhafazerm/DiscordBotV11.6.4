module.exports = {
    name: 'kick',
    description: 'send msg anonymous',
    execute(message, args ) {
        if (message.member.hasPermission("KICK_MEMBERS")) {
            const userKick = message.mentions.users.first();
            if (userKick) {
              var member = message.guild.member(userKick);
              if (member) {
                member
                  .kick("You have been kicked for breaking the rules")
                  .then(() => {
                    message.reply(`kicked user ${userKick.tag}!`);
                  });
                 }  else {
                    message.reply("that user is not in the server.");
                  }
                } else {
                  message.reply("you need to state a user to kick");
                }
              } else {
                message.reply("Hey.. What doin dawg!!");
              }

    }
}