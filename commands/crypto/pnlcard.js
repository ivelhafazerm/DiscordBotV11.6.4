module.exports = {
    name: 'card',
    description: 'PNL Card',
    async execute(message, args) {
        const {Attachment} = require('discord.js');
        const { Canvas, createCanvas, loadImage, registerFont}  = require('canvas');

        if (args.length < 3) {
            return message.channel.send('Please provide Ticker, Entry, and Sold amount. \n`+card jup 1 2`');
        }

        registerFont('./fonts/orbitron/Orbitron-Medium.ttf', { family: 'orbitmedium' });
        registerFont('./fonts/orbitron/Orbitron-SemiBold.ttf', { family: 'orbitsemibold' });
        const ticker = args[0].toUpperCase();
        const initialInvestment = parseFloat(args[1]);
        const soldAmount = parseFloat(args[2]);

        const profitLoss = (soldAmount - initialInvestment);
        const roiPercentage = (soldAmount - initialInvestment) / initialInvestment * 100;

        const canvas = createCanvas(1280, 720);
        const ctx = canvas.getContext('2d');

        let imageurl= /\?size=2048$/g;
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
                './images/green1.png',
                './images/green2.png',
                './images/green3.png',
                './images/green4.png',
                './images/green5.png',

            ],
            loss: [
                './images/red1.png',
                './images/red2.png',
                './images/red3.png',
                './images/red4.png',
                './images/red5.png',
                './images/red6.png',

            ],
        };

        const condition = profitLoss >= 0 ? 'profit' : 'loss';
        const imagePaths = images[condition];
        const randomImagePath = imagePaths[Math.floor(Math.random() * imagePaths.length)];
        const randomImages = await loadImage(randomImagePath);

        ctx.drawImage(randomImages, 0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#ffffff';
        ctx.font = '70px orbitsemibold';
        ctx.fillText(`${ticker}`, 87, 130);

        ctx.fillStyle = '#ffffff';
        ctx.font = ' 36px orbitmedium';
        ctx.fillText(`${initialInvestment}`, 335, 533);

        ctx.fillStyle = '#ffffff';
        ctx.font = ' 36px orbitmedium';
        ctx.fillText(`${soldAmount}`, 335, 612);

        ctx.fillStyle = profitLoss >= 0 ? '#02f7ca': '#f53d56';
        ctx.font = ' 80px orbitsemibold';
        if (profitLoss >= 0){
            ctx.fillText(`+${roiPercentage.toFixed(0)}%`,86, 455);
        }else {
            ctx.fillText(`${roiPercentage.toFixed(0)}%`,86, 455);
        }

        // ctx.fillStyle = profitLoss >= 0 ? '#02f7ca': '#f53d56';
        // ctx.font = ' 50px orbitmedium';
        // ctx.fillText(`+ ◎${profitLoss.toFixed(2)}`, 830, 380);
        drawRoundedImage(ctx, image, 1120, 55, 100, 100, 50);

        ctx.textAlign = "right";
        // ctx.direction = "rtl";
        ctx.fillStyle = '#ffffff';
        ctx.font = ' 40px orbitmedium';
        ctx.fillText(`@${message.author.username}`, 1110, 115);





        const buffer = canvas.toBuffer();
        const attachment = new Attachment(buffer, 'pnl.png');
        message.channel.send('PNL Card:',{ files: [attachment] })
            .catch(error => {
                console.error('Error sending message:', error);
            });
            // message.delete();


    },
};
