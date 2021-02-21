import Discord from "discord.js"

export default {
	name: "klok",
	description: "The bots thoughts on klok.",
	execute: (message: Discord.Message, args?: Array<string>): void => {
		message.channel.send("What's a klok? lol")
	},
}
