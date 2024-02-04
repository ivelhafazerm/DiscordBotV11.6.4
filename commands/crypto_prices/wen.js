    module.exports = {
    name: 'wen',
    description: 'Wen Price',
    async execute(message, args ) {
        try {
            const axios = require('axios');
            const DLMM_API_URL = 'https://dlmm-api.meteora.ag/pair/';
            const response = await axios.get(`${DLMM_API_URL}66A2vg4jwC9oSp5MGikzefgibdC5oSS3oARKjGbd2R1L`);
            const pairData = response.data;

            if (args.length === 1 && !isNaN(args[0])) {
                const num = parseFloat(args[0]);
                const calculatedPrice = pairData.current_price * num;
                const formattedPrice = `$${calculatedPrice.toFixed(4)}`;
                message.channel.send(`${num} WEN: ${formattedPrice}`);
            } else {
                const num = parseFloat(pairData.current_price);
                const price = num.toFixed(7);
                const formattedPrice = `$${Number(price)}`;
                message.channel.send(`Price: ${formattedPrice}`);
            }
        } catch (error) {
            console.error('Error fetching data from DLMM API:', error);
            message.channel.send('An error occurred while fetching data from the DLMM API.');
        }
    },

}