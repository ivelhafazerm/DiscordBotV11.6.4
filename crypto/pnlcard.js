module.exports = {
    name: 'card',
    description: 'PNL Card',
    async execute(message, args) {
        const { Attachment } = require('discord.js');
        const { createCanvas, loadImage, registerFont } = require('canvas');

        if (args.length < 3) {
            return message.channel.send('Please provide Ticker, Entry, and Sold amount. \n`+card jup 1 2`');
        }

        registerFont('./fonts/dpcomic.ttf', { family: 'Cat' });
        const ticker = args[0].toUpperCase();
        const initialInvestment = parseFloat(args[1]);
        const soldAmount = parseFloat(args[2]);

        const profitLoss = (soldAmount - initialInvestment);
        const roiPercentage = (soldAmount - initialInvestment) / initialInvestment * 100;

        const canvas = createCanvas(1280, 720);
        const ctx = canvas.getContext('2d');

        let imageurl = /\?size=2048$/g;
        let image = await loadImage(message.author.displayAvatarURL.replace(imageurl, '?size=128'));

        function drawRoundedImage(ctx, image, x, y, width, height, radius) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(x + radius, y + radius, radius, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(image, x, y, width, height);
            ctx.restore();
        }

        const images = {
            profit: [
                './images/profit.png',
            ],
            loss: [
                './images/loss.png',
            ],
        };

        const condition = profitLoss >= 0 ? 'profit' : 'loss';
        const imagePaths = images[condition];
        const randomImagePath = imagePaths[Math.floor(Math.random() * imagePaths.length)];
        const randomImages = await loadImage(randomImagePath);

        ctx.drawImage(randomImages, 0, 0, canvas.width, canvas.height);

        ctx.textAlign = "center";
        ctx.fillStyle = '#dddddd';
        ctx.font = '95px Cat';
        ctx.fillText(`${ticker}`, 640, 120);

        ctx.textAlign = "right";
        ctx.fillStyle = '#dddddd';
        ctx.font = ' 45px Cat';
        ctx.fillText(`${initialInvestment} SOL`, 610, 345);

        ctx.textAlign = "right";
        ctx.fillStyle = '#dddddd';
        ctx.font = ' 45px Cat';
        ctx.fillText(`${soldAmount} SOL`, 610, 430);

        ctx.textAlign = "right";
        ctx.fillStyle = '#000000';
        ctx.font = ' 45px Cat';
        ctx.fillText(`${profitLoss} SOL`, 600, 525);

        ctx.textAlign = "left";
        ctx.fillStyle = '#000000';
        ctx.font = ' 45px Cat';
        if (profitLoss >= 0) {
            ctx.fillText(`+${roiPercentage.toFixed(0)}%`, 105, 525);
        } else {
            ctx.fillText(`${roiPercentage.toFixed(0)}%`, 105, 525);
        }

        // ctx.fillStyle = profitLoss >= 0 ? '#02f7ca': '#f53d56';
        //ctx.font = ' 50px orbitmedium';
        //ctx.fillText(`+ ◎${profitLoss.toFixed(2)}`, 830, 380);
        //drawRoundedImage(ctx, image, 150, 600, 100, 100, 30);

        ctx.textAlign = "left";
        ctx.fillStyle = '#ffffff';
        ctx.font = ' 40px Cat';
        ctx.fillText(`${message.author.username}`, 152, 663);





        const buffer = canvas.toBuffer();
        const attachment = new Attachment(buffer, 'pnl.png');
        message.channel.send({ files: [attachment] })
            .catch(error => {
                console.error('Error sending message:', error);
            });
        message.delete();


    },
};
