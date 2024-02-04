module.exports = {
    name: 'pyth',
    description: 'token Price',
    async execute(message, args ) {
        try {
            const axios = require('axios');
            const token = 'HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3';
            const DEXSCREEN_API_URL = `https://api.dexscreener.com/latest/dex/tokens/${token}`;
            const response = await axios.get(DEXSCREEN_API_URL);
            const pairData = response.data;
            function numberWithCommas(x) {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }

            const nameToken = pairData.pairs[0].baseToken.name
            if (args.length === 1 && !isNaN(args[0])) {
                const num = parseFloat(args[0]);
                const calculatedPrice = pairData.pairs[0].priceUsd * num;
                const formattedPrice = numberWithCommas(calculatedPrice.toFixed(3));
                message.channel.send(`Name: **${nameToken}**\n${num} Pyth: $${formattedPrice}`);
            } else {
                const num = parseFloat(pairData.pairs[0].priceUsd);
                const price = num;
                const formattedPrice = `${Number(price.toFixed(3))}`;
                message.channel.send(`Price: $${formattedPrice}`);
            }
        } catch (error) {
            console.error('Error fetching data from DexScreener API:', error);
            message.channel.send('An error occurred while fetching data from the DexScreener API.');
        }
    },

}