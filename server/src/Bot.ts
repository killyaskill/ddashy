import { token, owners } from "./Config";
import BotClient from "./client/botclient";

const client: BotClient = new BotClient({ token, owners});
client.start();