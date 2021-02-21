import Discord from "discord.js"

interface DiscordCommandClient extends Discord.Client {
	commands?: Discord.Collection<any, any>
}

export default {
	name: "help",
	description: "List all of my commands or info about a specific command.",
	aliases: ["commands"],
	usage: "[command name]",
	cooldown: 5,
	execute: (
		message: Discord.Message,
		args: Array<string>
	): Promise<void> | void => {
		const prefix = "!"
		const data = []
		const { commands } = message.client as DiscordCommandClient

		if (!args.length) {
			data.push("Here's a list of all my commands:")
			data.push(commands?.map((command) => command.name).join(", "))
			data.push(
				`\nYou can send \`${prefix}help [command name]\` to get info on a specific command.`
			)

			return message.author
				.send(data, { split: true })
				.then(() => {
					if (message.channel.type === "dm") return
					message.reply("My commands have been dm'd to you.")
				})
				.catch((error) => {
					console.warn(
						`Could not send help DM to ${message.author.tag}.\n`,
						error
					)
					message.reply(
						"it seems like I can't DM you! Do you have DMs disabled?"
					)
				})
		}

		const name = args[0].toLowerCase()
		const command =
			commands?.get(name) ||
			commands?.find((c) => c.aliases && c.aliases.includes(name))

		if (!command) {
			message.reply("That's not a valid command...")
			return
		}

		data.push(`**Name:** ${command.name}`)

		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(", ")}`)
		if (command.description)
			data.push(`**Description:** ${command.description}`)
		if (command.usage)
			data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`)

		data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`)

		message.channel.send(data, { split: true })
	},
}
