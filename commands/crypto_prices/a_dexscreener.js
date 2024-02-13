module.exports = {
    name: 'd',
    description: 'Wen Price',
    async execute(message, args ) {
        const axios = require('axios');
        const DEXSCREEN_API_URL = `https://api.dexscreener.com/latest/dex/tokens/${args}`;
        const pairAddress = args[0];
        if (!pairAddress) {
            message.reply('Please provide a Pair address!');
            return;
        }
        try {
            const response = await axios.get(DEXSCREEN_API_URL);
            const pairData = response.data;
            const num = parseFloat(pairData.pairs[0].priceUsd);
            const price = num.toFixed(7);
            const formattedPrice = `$${Number(price)}`;
            const time = pairData.pairs[0].pairCreatedAt;
            console.log(time);
            message.channel.send(`Name: **${pairData.pairs[0].baseToken.name}**\nPrice: ${formattedPrice}`);
        } catch (error) {
            console.error('Error fetching data from DLMM API:', error);
            message.channel.send('An error occurred while fetching data from the DLMM API.');
        }
    }
}