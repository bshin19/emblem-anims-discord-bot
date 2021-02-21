import { driveSearchAnims } from "../drive/drive-search-anims"
import Discord from "discord.js"

export default {
	name: "run-update",
	cooldown: 10800,
	permissions: "MANAGE_WEBHOOKS",
	description: "Starts the assets update script. Permission & Time limited.",
	execute: (message: Discord.Message, args?: Array<string>): void => {
		message.channel.send("Beginning assets update.")
		// Any errors will be reported in the #shin-bot channel')
		driveSearchAnims()
		message.channel.send("Fetching up-to-date assets complete.")
	},
}
