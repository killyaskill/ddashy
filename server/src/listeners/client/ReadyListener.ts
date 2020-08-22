import { Listener } from "discord-akairo";
import API from "../../API/API";
export default class ReadyListener extends Listener {
    public constructor() {
        super("ready", {
            emitter: "client",
            event: "ready",
            category: "client"
        });
    }
    public exec(): void {
        console.log(`${this.client.user.tag} has loaded its files and is ready!`);

        new API(this.client).start();
    }
}