"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_akairo_1 = require("discord-akairo");
const Config_1 = require("../../Config");
class PingCommand extends discord_akairo_1.Command {
    constructor() {
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
    exec(message) {
        return message.channel.send(`My name is ${Config_1.name}!\nI am currently on version ${Config_1.version}!`);
    }
}
exports.default = PingCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5mb0NvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvUHVibGljL0luZm9Db21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQXlDO0FBRXpDLHlDQUE2QztBQUU3QyxNQUFxQixXQUFZLFNBQVEsd0JBQU87SUFDNUM7UUFDSSxLQUFLLENBQUMsT0FBTyxFQUFFO1lBQ1gsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO1lBQ2xCLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFdBQVcsRUFBRTtnQkFDYixPQUFPLEVBQUUseUJBQXlCO2dCQUNsQyxLQUFLLEVBQUUsT0FBTztnQkFDZCxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUM7YUFDbEI7WUFDRCxTQUFTLEVBQUUsQ0FBQztTQUNmLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSxJQUFJLENBQUMsT0FBZ0I7UUFDeEIsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLGFBQUksZ0NBQWdDLGdCQUFPLEdBQUcsQ0FBQyxDQUFDO0lBQzlGLENBQUM7Q0FDSjtBQWpCRCw4QkFpQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcImRpc2NvcmQtYWthaXJvXCI7XHJcbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xyXG5pbXBvcnQgeyBuYW1lLCB2ZXJzaW9uIH0gZnJvbSBcIi4uLy4uL0NvbmZpZ1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGluZ0NvbW1hbmQgZXh0ZW5kcyBDb21tYW5kIHtcclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihcImFib3V0XCIsIHtcclxuICAgICAgICAgICAgYWxpYXNlczogW1wiYWJvdXRcIl0sXHJcbiAgICAgICAgICAgIGNhdGVnb3J5OiBcIlB1YmxpY1wiLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjoge1xyXG4gICAgICAgICAgICBjb250ZW50OiBcIkZpbmQgb3V0IG1vcmUgYWJvdXQgbWUhXCIsXHJcbiAgICAgICAgICAgIHVzYWdlOiBcImFib3V0XCIsXHJcbiAgICAgICAgICAgIGV4YW1wbGVzOiBbXCJhYm91dFwiXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByYXRlbGltaXQ6IDNcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZXhlYyhtZXNzYWdlOiBNZXNzYWdlKTogUHJvbWlzZTxNZXNzYWdlPiB7XHJcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2UuY2hhbm5lbC5zZW5kKGBNeSBuYW1lIGlzICR7bmFtZX0hXFxuSSBhbSBjdXJyZW50bHkgb24gdmVyc2lvbiAke3ZlcnNpb259IWApO1xyXG4gICAgfVxyXG59Il19