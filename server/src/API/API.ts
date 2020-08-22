import { AkairoClient } from "discord-akairo";
import express, { Application } from "express";
import { createServer } from "http";
import cors from "cors";

import OAuth2Router from "./rooters/OAuth2Router";
import GuildRouter from "./rooters/GuildRooter";
import OAuth2 from "../structures/OAuth2";

export default class API {
    protected client: AkairoClient;
    protected server: Application;
    protected oauth: OAuth2;

    public constructor(client: AkairoClient) {
        this.client = client;
        this.oauth = new OAuth2(this.client);
    }

    public start(): void {
        this.server = express();
        this.server.use(express.json());
        this.server.use(cors({
            origin: true,
            credentials: true
        }));

        new OAuth2Router(this.server, this.client, this.oauth);
        new GuildRouter(this.server, this.client);

        createServer(this.server).listen(3306, (): void => console.log("API is online."))
    }
}