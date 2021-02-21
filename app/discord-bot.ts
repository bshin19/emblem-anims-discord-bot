import Discord from "discord.js"
import commands from "./commands"

interface DiscordCommandClient extends Discord.Client {
	commands?: Discord.Collection<any, any>
}

export const startDiscordClient = (): void => {
	const client: DiscordCommandClient = new Discord.Client()
	client.commands = new Discord.Collection()
	const cooldowns = new Discord.Collection()

	commands.map((command) => {
		client.commands?.set(command.name, command)
	})

	client.on("message", (message) => {
		if (!message.content.startsWith("!") || message.author.bot) return

		const args = message.content.slice(1).trim().split(/ +/)
		const commandName = args.shift()

		if (!client.commands?.has(commandName)) return

		const command = client.commands.get(commandName)

		if (command.permissions) {
			const authorPerms = message.channel?.permissionsFor(message.author)
			if (!authorPerms || !authorPerms.has(command.permissions)) {
				message.reply("You can not do this!")
				return
			}
		}

		const now = Date.now()
		const lastActivationTime = (cooldowns.get(command.name) as number) || 0
		const commandCooldown = (command.cooldown || 3) * 1000

		const cooldown = lastActivationTime + commandCooldown

		if (now < cooldown) {
			message.reply(
				`You cannot use the ${command.name} command until ${new Date(
					cooldown
				)}.`
			)
			return
		}

		// command not on cooldown ...
		cooldowns.set(command.name, now)

		setTimeout(() => cooldowns.delete(command.name), commandCooldown)

		try {
			command.execute(message, args)
		} catch (error) {
			console.warn(error)
			message.reply("there was an error trying to execute that command.")
		}
	})

	client.login(process.env.DISCORD_BOT_KEY)
}
