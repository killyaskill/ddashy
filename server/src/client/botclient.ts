import { AkairoClient, CommandHandler, ListenerHandler } from "discord-akairo";
import { Message } from "discord.js";
import { join } from "path";
import { prefix, owners } from "../Config";

declare module "discord-akairo" {
    interface AkairoClient {
        commandHandler: CommandHandler;
        listenerHandler: ListenerHandler;
    }
}

interface BotOptions {
    token?: string;
    owners?: string[];
}

export default class BotClient extends AkairoClient {
    public config: BotOptions;

    public listenerHandler: ListenerHandler = new ListenerHandler(this, {
        directory: join(__dirname, "..", "listeners")
    });

    public commandHandler: CommandHandler = new CommandHandler(this, {
        directory: join(__dirname, "..", "commands"),

        prefix,
        allowMention: true,
        defaultCooldown: 6e4,
        ignorePermissions: owners
    });

    public constructor(config: BotOptions){
        super({
            ownerID: config.owners
        });
        this.config = config;
    }

    private init(): void {
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            listenerHandler: this.listenerHandler,
            process
        });

        this.commandHandler.loadAll();
        this.listenerHandler.loadAll();
    }

    public async start(): Promise<string> {
        await this.init();
        return this.login(this.config.token);
    }
}