import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { name, version } from "../../Config";

export default class PingCommand extends Command {
    public constructor() {
        super("help", {
            aliases: ["help"],
            category: "Public",
            description: {
            content: "Get some help.",
            usage: "help",
            examples: ["help"]
            },
            ratelimit: 3
        });
    }

    public exec(message: Message): Promise<Message> {
        return message.channel.send(`These are my commands:\n-help | This one\n-about\n-Ping`);
    }
}