module.exports = {
    name: 'bal',
    description: '',
   async execute(message, args ) {
        const Discord = require("discord.js");
        const solanaWeb3 = require('@solana/web3.js');
        const connection = new solanaWeb3.Connection('https://api.mainnet-beta.solana.com');
        const solanaAddress = args[0];

        async function getSolanaBalance(address) {
            try {
              const publicKey = new solanaWeb3.PublicKey(address);
              const balance = await connection.getBalance(publicKey) / solanaWeb3.LAMPORTS_PER_SOL;
              return balance;
            } catch (error) {
              throw new Error(`Error fetching balance: ${error}`);
            }
          }

            if (!solanaAddress) {
              message.reply('Please provide a Solana address!');
              return;
            }

            try {
              const balance = await getSolanaBalance(solanaAddress);
              const anonAddress = `${solanaAddress.substring(0, 4)}...${solanaAddress.slice(-4)}`;
              message.delete();
              const balanceEmbed = new Discord.RichEmbed() // Change RichEmbed to MessageEmbed
          .setColor('#03fca5')
          .setTitle('Wallet Balance')
          .setThumbnail('https://cryptologos.cc/logos/solana-sol-logo.png?v=029')
          .addField(`${anonAddress}`,`◎ *${balance}*`)
          .setFooter('Deleted after 2 seconds');
        // Send anonymous message using an embed
            const send = await message.channel.send(balanceEmbed);

            setTimeout(() => {
                send.delete();
            }, 2000);
            } catch (error) {
              message.channel.send(`Error: ${error.message}`);
            }
    }
}