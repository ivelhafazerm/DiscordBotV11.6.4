    module.exports = {
    name: 'jup',
    description: 'Jup Price',
    async execute(message, args ) {
        try {
            const axios = require('axios');
            const JUP_API_URL = 'https://price.jup.ag/v4/price?ids=JUP';
            const response = await axios.get(JUP_API_URL);
            const pairData = response.data;

            function numberWithCommas(x) {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }

            if (args.length === 1 && !isNaN(args[0])) {
                const num = parseFloat(args[0]);
                const calculatedPrice = pairData.data.JUP.price * num;
                const formattedPrice = numberWithCommas(calculatedPrice.toFixed(2));
                message.channel.send(`${num} JUP: $${formattedPrice}`);
            } else {
                const num = parseFloat(pairData.data.JUP.price);
                const price = num.toFixed(5);
                const formattedPrice = `$${Number(price)}`;
                message.channel.send(`Price: ${formattedPrice}`);
            }
        } catch (error) {
            console.error('Error fetching data from JUP API:', error);
            message.channel.send('An error occurred while fetching data from the JUP API.');
        }
    },

}