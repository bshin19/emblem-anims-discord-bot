import Discord from "discord.js"

export default {
	name: "email-shin",
	description: "will it work?...",
	execute: (message: Discord.Message, args?: Array<string>): void => {
		message.channel.send("No.")
	},
}
