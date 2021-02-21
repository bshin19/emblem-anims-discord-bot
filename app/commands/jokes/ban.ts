import Discord from "discord.js"

export default {
	name: "ban",
	description: "Ban a ne'er-do-well from our glorious community",
	execute: (message: Discord.Message, args?: Array<string>): void => {
		const taggedUser = message.mentions.users.first()

		if (!taggedUser) {
			message.channel.send(`Tell me whose day to ruin, ${message.author}.`)
		} else {
			message.channel.send(`${taggedUser}, you are already dead.`)
		}
	},
}
