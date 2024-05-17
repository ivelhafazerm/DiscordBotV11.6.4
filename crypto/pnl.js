module.exports = {
    name: 'pnl',
    description: 'Calculate Profit and Loss',
    execute(message, args) {
        const Discord = require('discord.js');

        if (args.length < 3) {
            return message.channel.send('Please provide initial and sold amount. \n``` +pnl 10 100 ```');
        }

        const ticker = args[0].toUpperCase();
        const initialInvestment = parseFloat(args[1]);
        const soldAmount = parseFloat(args[2]);

        const realized = (soldAmount - initialInvestment);
        const roiPercentage = (soldAmount - initialInvestment) / initialInvestment * 100;

        const pnlCard = new Discord.RichEmbed()
            .setTitle('Profit and Loss')
            .addField('Ticker', `${ticker}`)
            .addField('Initial', `$${initialInvestment.toFixed(2)}`, true)
            .addField('Sold', `$${soldAmount.toFixed(2)}`, true)
            .addField('ROI', `${roiPercentage.toFixed(0)}%`, true)
            .addField('Realized', `$${realized.toFixed(2)}`, true)
            .setColor(realized >= 0 ? '#00ff00' : '#ff0000')
            .setFooter('🫡')
            .setTimestamp();

        message.channel.send(pnlCard);
    },
};
