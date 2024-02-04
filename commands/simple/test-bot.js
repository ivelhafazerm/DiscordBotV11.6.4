module.exports = {
    name: 'ahjin',
    description: 'send msg anonymous',
    execute(message, args ) {
        const test = "### im still here!! \nhow can i help you?";
    message.channel.send(test)
    }
}