module.exports = {
    name: 'timer',
    description: '',
    execute(message, args) {

        const timeInMinutes = parseInt(message.content.split(' ')[1]);

        if (!isNaN(timeInMinutes) && timeInMinutes > 0) {
            message.channel.send(`Timer set for ${timeInMinutes} minutes.`);

            setTimeout(() => {
                message.channel.send(`Timer is up! ${message.author}, your time is over.`);
            }, timeInMinutes * 60 * 1000);
        } else {
            message.channel.send('Invalid timer duration. Please provide a valid number of minutes.');
        }
    }
}