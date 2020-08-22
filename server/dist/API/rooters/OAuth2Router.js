"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const node_fetch_1 = __importDefault(require("node-fetch"));
const express_session_1 = __importDefault(require("express-session"));
const Config_1 = require("../../Config");
class OAuth2Router {
    constructor(app, client, oauth) {
        this.app = app;
        this.client = client;
        this.router = express_1.Router();
        this.oauth = oauth;
        this.app.use(express_session_1.default({
            secret: Config_1.authorization,
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: "auto",
                sameSite: false,
                httpOnly: false,
                maxAge: 6048e5
            }
        }));
        this.app.use(this.router);
        this.router.get("/oath/login", (req, res) => {
            return res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${Config_1.clientID}&redirect_uri=${encodeURIComponent(Config_1.callbackUrl)}&response_type=code&scope=${encodeURIComponent("identify guilds")}`);
        });
        this.router.get("/oauth/logout", (req, res) => {
            req.session.destroy(null);
            return res.redirect(Config_1.redirectUri);
        });
        this.router.get("/oauth/callback", (req, res) => {
            node_fetch_1.default("https://discord.com/api/oauth2/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                //@ts-ignore
                body: new URLSearchParams({
                    "client_id": Config_1.clientID,
                    "client_secret": Config_1.clientSecret,
                    "grant_type": "authorization_code",
                    "code": req.query.code,
                    "redirect_uri": Config_1.callbackUrl,
                    "scope": "identify"
                })
            })
                .then(response => response.json())
                .then(response => {
                req.session.token = response["access_token"];
                response.redirect(Config_1.redirectUri);
            });
        });
        this.router.get("/oauth/details", async (req, res) => {
            const details = await this.oauth.resolveInformation(req);
            return res.status(200).send(details);
        });
    }
}
exports.default = OAuth2Router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT0F1dGgyUm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL0FQSS9yb290ZXJzL09BdXRoMlJvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHFDQUEyRTtBQUUzRSw0REFBK0I7QUFDL0Isc0VBQXNDO0FBRXRDLHlDQUErRjtBQUUvRixNQUFxQixZQUFZO0lBTTdCLFlBQW1CLEdBQWdCLEVBQUUsTUFBb0IsRUFBRSxLQUFhO1FBQ3BFLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxnQkFBTSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFFbkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMseUJBQU8sQ0FBQztZQUNqQixNQUFNLEVBQUUsc0JBQWE7WUFDckIsTUFBTSxFQUFFLEtBQUs7WUFDYixpQkFBaUIsRUFBRSxLQUFLO1lBQ3hCLE1BQU0sRUFBRTtnQkFDSixNQUFNLEVBQUUsTUFBTTtnQkFDZCxRQUFRLEVBQUUsS0FBSztnQkFDZixRQUFRLEVBQUUsS0FBSztnQkFDZixNQUFNLEVBQUUsTUFBTTthQUNqQjtTQUNKLENBQUMsQ0FBQyxDQUFDO1FBRUosSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTFCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUMsRUFBRTtZQUMxRCxPQUFPLEdBQUcsQ0FBQyxRQUFRLENBQUMsc0RBQXNELGlCQUFRLGlCQUFpQixrQkFBa0IsQ0FBQyxvQkFBVyxDQUFDLDZCQUE2QixrQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM1TSxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUMsRUFBRTtZQUM1RCxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxQixPQUFPLEdBQUcsQ0FBQyxRQUFRLENBQUMsb0JBQVcsQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLEVBQUU7WUFDL0Qsb0JBQUssQ0FBQyxzQ0FBc0MsRUFBRTtnQkFDMUMsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsT0FBTyxFQUFFO29CQUNMLGNBQWMsRUFBRSxtQ0FBbUM7aUJBQ3REO2dCQUNELFlBQVk7Z0JBQ1osSUFBSSxFQUFFLElBQUksZUFBZSxDQUFDO29CQUN0QixXQUFXLEVBQUUsaUJBQVE7b0JBQ3JCLGVBQWUsRUFBRSxxQkFBWTtvQkFDN0IsWUFBWSxFQUFFLG9CQUFvQjtvQkFDbEMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSTtvQkFDdEIsY0FBYyxFQUFFLG9CQUFXO29CQUMzQixPQUFPLEVBQUUsVUFBVTtpQkFDdEIsQ0FBQzthQUNMLENBQUM7aUJBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO2lCQUNqQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ2IsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUM3QyxRQUFRLENBQUMsUUFBUSxDQUFDLG9CQUFXLENBQUMsQ0FBQztZQUNuQyxDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsS0FBSyxFQUFFLEdBQVksRUFBRSxHQUFhLEVBQUUsRUFBRTtZQUNwRSxNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDekQsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7Q0FDSjtBQTlERCwrQkE4REMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZXIsIFJlcXVlc3QsIFJlc3BvbnNlLCBBcHBsaWNhdGlvbiwgcmVzcG9uc2UgfSBmcm9tIFwiZXhwcmVzc1wiO1xyXG5pbXBvcnQgeyBBa2Fpcm9DbGllbnQgfSBmcm9tIFwiZGlzY29yZC1ha2Fpcm9cIjtcclxuaW1wb3J0IGZldGNoIGZyb20gXCJub2RlLWZldGNoXCI7XHJcbmltcG9ydCBzZXNzaW9uIGZyb20gXCJleHByZXNzLXNlc3Npb25cIjtcclxuaW1wb3J0IE9BdXRoMiBmcm9tIFwiLi4vLi4vc3RydWN0dXJlcy9PQXV0aDJcIjtcclxuaW1wb3J0IHsgY2FsbGJhY2tVcmwsIGF1dGhvcml6YXRpb24sIGNsaWVudElELCByZWRpcmVjdFVyaSwgY2xpZW50U2VjcmV0IH0gZnJvbSBcIi4uLy4uL0NvbmZpZ1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT0F1dGgyUm91dGVyIHtcclxuICAgIHByb3RlY3RlZCBhcHA6IEFwcGxpY2F0aW9uO1xyXG4gICAgcHJvdGVjdGVkIGNsaWVudDogQWthaXJvQ2xpZW50O1xyXG4gICAgcHJvdGVjdGVkIHJvdXRlcjogUm91dGVyO1xyXG4gICAgcHJvdGVjdGVkIG9hdXRoOiBPQXV0aDI7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGFwcDogQXBwbGljYXRpb24sIGNsaWVudDogQWthaXJvQ2xpZW50LCBvYXV0aDogT0F1dGgyKXtcclxuICAgICAgICB0aGlzLmFwcCA9IGFwcDtcclxuICAgICAgICB0aGlzLmNsaWVudCA9IGNsaWVudDtcclxuICAgICAgICB0aGlzLnJvdXRlciA9IFJvdXRlcigpO1xyXG4gICAgICAgIHRoaXMub2F1dGggPSBvYXV0aDtcclxuXHJcbiAgICAgICAgdGhpcy5hcHAudXNlKHNlc3Npb24oe1xyXG4gICAgICAgICAgICBzZWNyZXQ6IGF1dGhvcml6YXRpb24sXHJcbiAgICAgICAgICAgIHJlc2F2ZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHNhdmVVbmluaXRpYWxpemVkOiBmYWxzZSxcclxuICAgICAgICAgICAgY29va2llOiB7XHJcbiAgICAgICAgICAgICAgICBzZWN1cmU6IFwiYXV0b1wiLFxyXG4gICAgICAgICAgICAgICAgc2FtZVNpdGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgaHR0cE9ubHk6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgbWF4QWdlOiA2MDQ4ZTVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgdGhpcy5hcHAudXNlKHRoaXMucm91dGVyKTtcclxuXHJcbiAgICAgICAgdGhpcy5yb3V0ZXIuZ2V0KFwiL29hdGgvbG9naW5cIiwgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSk9PntcclxuICAgICAgICAgICAgcmV0dXJuIHJlcy5yZWRpcmVjdChgaHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvb2F1dGgyL2F1dGhvcml6ZT9jbGllbnRfaWQ9JHtjbGllbnRJRH0mcmVkaXJlY3RfdXJpPSR7ZW5jb2RlVVJJQ29tcG9uZW50KGNhbGxiYWNrVXJsKX0mcmVzcG9uc2VfdHlwZT1jb2RlJnNjb3BlPSR7ZW5jb2RlVVJJQ29tcG9uZW50KFwiaWRlbnRpZnkgZ3VpbGRzXCIpfWApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMucm91dGVyLmdldChcIi9vYXV0aC9sb2dvdXRcIiwgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSk9PntcclxuICAgICAgICAgICAgcmVxLnNlc3Npb24uZGVzdHJveShudWxsKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcy5yZWRpcmVjdChyZWRpcmVjdFVyaSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMucm91dGVyLmdldChcIi9vYXV0aC9jYWxsYmFja1wiLCAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PntcclxuICAgICAgICAgICAgZmV0Y2goXCJodHRwczovL2Rpc2NvcmQuY29tL2FwaS9vYXV0aDIvdG9rZW5cIiwge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICBib2R5OiBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcclxuICAgICAgICAgICAgICAgICAgICBcImNsaWVudF9pZFwiOiBjbGllbnRJRCxcclxuICAgICAgICAgICAgICAgICAgICBcImNsaWVudF9zZWNyZXRcIjogY2xpZW50U2VjcmV0LFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZ3JhbnRfdHlwZVwiOiBcImF1dGhvcml6YXRpb25fY29kZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiByZXEucXVlcnkuY29kZSxcclxuICAgICAgICAgICAgICAgICAgICBcInJlZGlyZWN0X3VyaVwiOiBjYWxsYmFja1VybCxcclxuICAgICAgICAgICAgICAgICAgICBcInNjb3BlXCI6IFwiaWRlbnRpZnlcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXEuc2Vzc2lvbi50b2tlbiA9IHJlc3BvbnNlW1wiYWNjZXNzX3Rva2VuXCJdO1xyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UucmVkaXJlY3QocmVkaXJlY3RVcmkpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnJvdXRlci5nZXQoXCIvb2F1dGgvZGV0YWlsc1wiLCBhc3luYyAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PntcclxuICAgICAgICAgICAgY29uc3QgZGV0YWlscyA9IGF3YWl0IHRoaXMub2F1dGgucmVzb2x2ZUluZm9ybWF0aW9uKHJlcSk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuc2VuZChkZXRhaWxzKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59Il19