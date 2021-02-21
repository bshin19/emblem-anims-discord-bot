import Discord from "discord.js"

export default {
	name: "good-bot",
	description: "Don't appreciate the bot",
	execute: (message: Discord.Message, args?: Array<string>): void => {
		message.channel.send("Fuck off.")
	},
}
