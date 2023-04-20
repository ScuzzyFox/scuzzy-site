//@ts-nocheck
//const Discord = require('discord.js');
import Discord from 'discord.js';
//const TelegramBot = require('node-telegram-bot-api');
import TelegramBot from 'node-telegram-bot-api';
import { DISCORD_BOT_TOKEN, TELEGRAM_BOT_TOKEN } from '$env/static/private';
import contactScuzzy from '$lib/images/contactScuzzy.png?webp';
import favicon from '$lib/images/logos/favicon.png?webp';

export async function notifyDiscordUsers() {
	const client = new Discord.Client();
	const discordCommissionsChannel = 'commission-announcements';
	discordCommissionsChannel = 'staff-bot-commands'; //uncomment for debugging.
	const discordCommissionsRole = 'Commission Ping';

	client.on('ready', () => {
		const commissionChannel = client.channels.cache.find(
			(channel) => channel.name === discordCommissionsChannel
		);
		const commissionPing = commissionChannel.guild.roles.cache.find(
			(role) => role.name === discordCommissionsRole
		);

		const notificationEmbed = new Discord.EmbedBuilder()
			.setType('rich')
			.setColor(0x1fa0e9)
			.setTitle('ScuzzyFox is Open for Commissoins!')
			.setURL('https://scuzzyfox.com/commissions')
			.setAuthor({
				name: 'Scuzzy',
				iconURL: contactScuzzy,
				url: 'https://discordapp.com/users/262321678837612554'
			})
			.setDescription(
				`Hey, I'm open for commissions!\nHead to https://scuzzyfox.com/commissions and fill out a form!\n\nReminder these are not first come-first, first-serve, so don't rush on trying to be first!\n\nAdditionally, check out my terms of service at https://scuzzyfox.com/tos.\n\nHave any questions? DM me here on discord or on telegram [@ScuzzyFox](https://t.me/scuzzyfox)\n\nThank you for your business!`
			)
			.setThumbnail(favicon)
			//.setImage('https://i.imgur.com/AfFp7pu.png') //probably gonna want a commission sheet or thumbnail or something here
			.setTimestamp()
			.setFooter({ text: 'Sent from my Samsung fridge' });

		commissionChannel.send({
			content: `Check it out, ${commissionPing}`,
			embeds: [notificationEmbed]
		});
	});

	client.login(DISCORD_BOT_TOKEN);

	setTimeout(() => {
		client.destroy();
	}, 10000);
}

export async function notifyTelegramUsers() {
	const bot = new TelegramBot(TELEGRAM_BOT_TOKEN);
	const message = `*Hello\\!*\n__Scuzzy is now open for commissions\\.__ Check out [scuzzyfox\\.com/commissions](https://scuzzyfox.com/commissions) to submit a form\\.\n\nReminder that submissions are not first\\-come, first\\-serve, so don't rush in trying to be the first\\!\n\nAdditionally, check out my terms of service at [scuzzyfox\\.com/tos](https://scuzzyfox.com/tos)\\.\n\nHave any questions? DM me here on Telegram [@ScuzzyFox](https://t.me/scuzzyfox)\\.\n\nThank you for your business\\!`;

	bot.getUpdates().then((updates) => {
        //this isn't going to work as updates aren't stored, so I'll have to make a real telegram bot that polls and stores chat ID's
        //and then pull the list of ID's and send messages here through a rest call
        //back end is going to need a bot api token and a new token authentication system so only the bot can add the chat id's
        //I could get around this by making a group chat or channel that is just for commission announcements as well. then the chat_id could be hardcoded.
        console.log(JSON.stringify(updates))
		const chatIds = updates.map((update) => update.message.chat.id);
		const uniqueChatIds = [...new Set(chatIds)];

		uniqueChatIds.forEach((chatId) => {
			bot.sendMessage(chatId, message, {
				parse_mode: 'MarkdownV2'
			});

			//could also send an image https://core.telegram.org/bots/api#sendphoto
		});

	});
}
