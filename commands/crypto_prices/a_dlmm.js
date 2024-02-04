module.exports = {
    name: 'dlmm',
    description: 'Wen Price',
    async execute(message, args ) {
        const axios = require('axios');
        const DLMM_API_URL = `https://dlmm-api.meteora.ag/pair/${args}`;
        const pairAddress = args[0];
        if (!pairAddress) {
            message.reply('Please provide a Pair address!');
            return;
        }
        try {
            const response = await axios.get(DLMM_API_URL);
            const pairData = response.data;
            const num = parseFloat(pairData.current_price);
            const price = num.toFixed(7);
            const formattedPrice = `$${Number(price)}`;
            message.channel.send(`Name: ${pairData.name}\nPrice: ${formattedPrice}`);
        } catch (error) {
            console.error('Error fetching data from DLMM API:', error);
            message.channel.send('An error occurred while fetching data from the DLMM API.');
        }
    }
}