import { config as envConfig } from "dotenv"
import { startDiscordClient } from "./discord-bot"

envConfig()
startDiscordClient()
