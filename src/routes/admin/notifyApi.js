//@ts-nocheck
import Discord from 'discord.js';
import TelegramBot from 'node-telegram-bot-api';
import { DISCORD_BOT_TOKEN, TELEGRAM_BOT_TOKEN } from '$env/static/private';

async function getChatIdList(token) {
	let chat_ids;
	const response = await fetch('https://api.scuzzyfox.com/telegram/', {
		method: 'GET',
		headers: {
			Authorization: `JWT ${token}`,
			'Content-Type': 'application/json'
		}
	});

	if (response.ok) {
		chat_ids = await response.json();
		chat_ids = chat_ids.map((chat) => chat.chat_id);
		return chat_ids;
	} else {
		throw new Error(JSON.stringify(response.json()));
	}
}

export async function notifyDiscordUsers() {
	const client = new Discord.Client({ intents: [Discord.GatewayIntentBits.Guilds] });
	const discordCommissionsChannel = 'commission-announcements'; //comment for debugging.
	//const discordCommissionsChannel = 'staff-bot-commands'; //uncomment for debugging.
	const discordCommissionsRole = 'Commission Ping';

	client.on('ready', () => {
		const commissionChannel = client.channels.cache.find(
			(channel) => channel.name === discordCommissionsChannel
		);
		const commissionPing = commissionChannel.guild.roles.cache.find(
			(role) => role.name === discordCommissionsRole
		);

		const notificationEmbed = new Discord.EmbedBuilder()
			.setColor(0xefdb23)
			.setTitle('ScuzzyFox is Open for Commissoins!')
			.setURL('https://scuzzyfox.com/commissions')
			.setDescription(
				`Hey, I'm open for commissions!\nHead to https://scuzzyfox.com/commissions to get one!\n\nReminder these are not first-come, first-serve, so don't rush on trying to be first!\n\nAdditionally, check out my terms of service at https://scuzzyfox.com/tos.\n\nHave any questions? DM me here on discord or on telegram [@ScuzzyFox](https://t.me/scuzzyfox)\n\nHope to draw you soon!`
			)
			//.setImage('https://i.imgur.com/AfFp7pu.png') //probably gonna want a commission sheet or thumbnail or something here

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

export async function notifyTelegramUsers(token) {
	var bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: false });
	const message = `*Hello\\!*\n__Scuzzy is now open for commissions\\.__ Check out [scuzzyfox\\.com/commissions](https://scuzzyfox.com/commissions) to get one\\.\n\nReminder that submissions are not first\\-come, first\\-serve, so don't rush in trying to be the first\\!\n\nAdditionally, check out my terms of service at [scuzzyfox\\.com/tos](https://scuzzyfox.com/tos)\\.\n\nHave any questions? DM me here on Telegram [@ScuzzyFox](https://t.me/scuzzyfox)\\.\n\nLooking forward to drawing you soon\\!`;

	getChatIdList(token)
		.then((ids) => {
			let chat_ids = ids;
			if (!chat_ids) {
				return;
			}
			// for each chat id in chat ids, send the message to that chat id.
			chat_ids.forEach((id) => {
				try {
					bot.sendMessage(id, message, { parse_mode: 'MarkdownV2' });
				} catch (err) {
					console.log(err);
				}
			});
		})
		.catch((err) => {
			console.log(err);
		});

	setTimeout(() => {
		bot.stopPolling();
		bot = null;
	}, 10000);
}
