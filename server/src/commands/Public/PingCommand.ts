import { Command } from "discord-akairo";
import { Message } from "discord.js";

export default class PingCommand extends Command {
    public constructor() {
        super("ping", {
            aliases: ["ping"],
            category: "Public",
            description: {
            content: "Check my connection to discord!",
            usage: "ping",
            examples: ["ping"]
            },
            ratelimit: 3
        });
    }

    public exec(message: Message): Promise<Message> {
        return message.channel.send(`Pong! ${this.client.ws.ping}ms`);
    }
}