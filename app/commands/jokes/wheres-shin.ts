import Discord from "discord.js"

export default {
	name: "wheres-shin",
	description: "Information on Shin's location",
	execute: (message: Discord.Message, args?: Array<string>): void => {
		message.channel.send("Say hi to your mother for me.")
	},
}
