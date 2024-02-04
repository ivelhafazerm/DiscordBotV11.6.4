module.exports = {
    name: 'help',
    description: 'Display available commands',
    execute(message, args, commands) {
        const data = [];
        data.push('Here are the available commands:');
        commands.name(command => {
            data.push(`**${command.name}**: ${command.description}`);
        });
        message.channel.send(data, { split: true });
    },
};
