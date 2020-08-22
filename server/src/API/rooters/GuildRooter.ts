import { Router, Request, Response, Application } from "express";
import { AkairoClient } from "discord-akairo";
import { Guild } from "discord.js";
import { authorization } from "../../Config";

export default class GuildRooter {
    protected app: Application;
    protected client: AkairoClient;
    protected router: Router;

    public constructor(app: Application, client: AkairoClient){
        this.app = app;
        this.client = client;
        this.router = Router();

        this.app.use(this.router);

        // https://localhost/v1/get/guild/ID
        this.router.get("/v1/get/guild/:id", (req: Request, res: Response) => {
            const guild: Guild = this.client.guilds.cache.get(req.params.id);
            if(!guild) return res.status(404).send({ message: "Guild not found..."});

            return res.status(200).send({
                name: guild.name,
                owner: guild.owner,
                members: guild.memberCount
            });
        });

        this.router.post("/v1/post/guild-name/:id", (req: Request, res: Response) => {
            if(req.headers.authorization !== authorization) return res.status(401).send({ message: "401"});

            const guild: Guild = this.client.guilds.cache.get(req.params.id);
            if(!guild) return res.status(404).send({ message: "Guild not found..."});

            if(!req.body.name) return res.status(404).send({message: "404"});
            if(req.body.name.length > 32) return res.status(400).send({message: "(404) => Guild name cannot exceed over 32 chars..."});
            if(!guild.me.permissions.has("MANAGE_GUILD")) return res.status(401).send({message: "Missing Permission: MANAGE_GUILD"});

            guild.setName(req.body.name);

            return res.status(201).send(req.body);
        });
    }
}