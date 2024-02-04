module.exports = {
    name: 'verify',
    description: 'give roles verify',
    execute(message, args ) {
        const verifiedRole = message.guild.roles.find(role => role.name === 'Shadow');

        if (!verifiedRole) {
          console.error('Verified role not found.');
          return message.reply('The Verified role is not set up properly. Please contact the server administrator.');
        }

        // Check if the user has the 'Verified' role
        if (message.member.roles.some(role => role.name === "Shadow")) {
          // User is already verified, remove the 'Verified' role
          message.member.removeRole(verifiedRole)
            .then(() => {
              message.reply(':x: You have been unverified :x:. \nUse `+verify` again to verify.');
            })
            .catch(error => {
              console.error('Error removing role:', error);
              message.reply('An error occurred while unverifying. Please try again.');
            });
        } else {
          // User doesn't have the 'Verified' role, give the role
          message.member.addRole(verifiedRole)
            .then(() => {
              message.reply(':white_check_mark: You have been verified! :white_check_mark:');
            })
            .catch(error => {
              console.error('Error adding role:', error);
              message.reply('An error occurred while verifying. Please try again.');
            });
        }
      }
  }
