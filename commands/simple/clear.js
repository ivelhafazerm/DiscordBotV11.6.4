module.exports = {
    name: 'clear',
    description: 'Clear messages',
    async execute(message, args) {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) {
            return message.reply('You do not have the required permissions to use this command.');
        }

        const amount = parseInt(args[0]);

        if (isNaN(amount) || amount <= 0 || amount > 99) {
            if (amount > 99) {
                return message.reply("We're not allowed to clear more than 99 messages at once.");
            } else {
                return message.reply('Please provide a number between 1 and 99 for the messages to clear at once.');
            }
        }

        try {
            const messages = await message.channel.bulkDelete(amount + 1); // Adding 1 to also delete the command message
            const confirmationMessage = await message.channel.send(`Cleared ${messages.size -1} messages.`);

            // Delete the confirmation message after 5 seconds (5000 milliseconds)
            setTimeout(() => {
                confirmationMessage.delete();
            }, 1000);
        } catch (error) {
            console.error('Error clearing messages:', error);
        }
    }
};