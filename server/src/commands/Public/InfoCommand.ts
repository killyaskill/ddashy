import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { name, version } from "../../Config";

export default class PingCommand extends Command {
    public constructor() {
        super("about", {
            aliases: ["about"],
            category: "Public",
            description: {
            content: "Find out more about me!",
            usage: "about",
            examples: ["about"]
            },
            ratelimit: 3
        });
    }

    public exec(message: Message): Promise<Message> {
        return message.channel.send(`My name is ${name}!\nI am currently on version ${version}!`);
    }
}