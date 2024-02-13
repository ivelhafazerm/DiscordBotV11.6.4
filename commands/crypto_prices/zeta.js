const Discord = require('discord.js');
module.exports = {
    name: 'zeta',
    description: 'token Price',
    async execute(message, args) {
        try {
            function getRandomColor() {
                const letters = '0123456789ABCDEF';
                let color = '#';
                for (let i = 0; i < 6; i++) {
                    color += letters[Math.floor(Math.random() * 16)];
                }
                return color;
            }
            const axios = require('axios');
            const ids = 'zetachain';
            const CoinGecko_API_URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&x_cg_demo_api_key=CG-ifv4ChivUP3My2FAa6UuuKTo`;
            const response = await axios.get(CoinGecko_API_URL);
            const pairData = response.data;
            function numberWithCommas(x) {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
            if (args.length === 1 && !isNaN(args[0])) {
                const num = parseFloat(args[0]);
                const calculatedPrice = pairData[0].current_price * num;
                const formattedPrice = numberWithCommas(calculatedPrice.toFixed(0));
                message.channel.send(`$${formattedPrice}`);
            } else {

                const num = parseFloat(pairData[0].current_price);
                const formattedPrice = numberWithCommas(num);
                const embed = new Discord.RichEmbed()
                    .setColor(`${getRandomColor()}`)
                    .setDescription(`## $${formattedPrice}`)
                    .setFooter(`${pairData[0].name}`, `${pairData[0].image}`);

                message.channel.send(embed);
            }
        } catch (error) {
            console.error('Error fetching data from CoinGecko API:', error);
            message.channel.send('An error occurred while fetching data from the DexScreener API.');
        }
    },

}