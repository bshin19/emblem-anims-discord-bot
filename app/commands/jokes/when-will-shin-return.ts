import Discord from "discord.js"

export default {
	name: "when-will-shin-return",
	description: "The bot knows",
	execute: (message: Discord.Message, args?: Array<string>): void => {
		message.channel.send("No one knows.")
	},
}
