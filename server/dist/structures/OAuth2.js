"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const Config_1 = require("../Config");
class OAuth2 {
    constructor(client) {
        this.client = client;
        this.guilds = new Object();
    }
    async resolveInformation(req) {
        if (!req.session.token)
            return null;
        const userReq = await node_fetch_1.default("https://discord.com/api/users/@me", {
            headers: {
                "Authorization": `Bearer ${req.session.token}`
            }
        });
        const user = await userReq.json();
        if (!user.id)
            return null;
        if (!this.guilds[user.id]) {
            const guildsReq = await node_fetch_1.default("https://discord.com/api/users/@me/guilds", {
                headers: {
                    "Authorization": `Bearer ${req.session.token}`
                }
            });
            const guildsRes = await guildsReq.json();
            this.guilds[user.id] = guildsRes;
            setTimeout(() => {
                delete this.guilds[user.id];
            }, 3e5);
        }
        return {
            id: user.id,
            username: user.username,
            discriminator: user.discriminator,
            avatar: user.avatar,
            guilds: this.guilds[user.id].map((guild) => {
                const g = this.client.guilds.cache.get(guild.id);
                return {
                    id: guild.id,
                    name: guild.name,
                    icon: guild.icon,
                    admin: g ? g.members.cache.get(user.id).permissions.has("MANAGE_GUILD") : guild.owner,
                    invited: g ? true : false
                };
            }),
            admin: Config_1.owners.includes(user.id)
        };
    }
}
exports.default = OAuth2;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT0F1dGgyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3N0cnVjdHVyZXMvT0F1dGgyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBR0EsNERBQStCO0FBQy9CLHNDQUFtQztBQUluQyxNQUFxQixNQUFNO0lBSXZCLFlBQW1CLE1BQW9CO1FBQ25DLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxNQUFNLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRU0sS0FBSyxDQUFDLGtCQUFrQixDQUFDLEdBQVk7UUFDeEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBRXBDLE1BQU0sT0FBTyxHQUFHLE1BQU0sb0JBQUssQ0FBQyxtQ0FBbUMsRUFBRTtZQUM3RCxPQUFPLEVBQUU7Z0JBQ0wsZUFBZSxFQUFFLFVBQVUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUU7YUFDakQ7U0FDSixDQUFDLENBQUM7UUFFSCxNQUFNLElBQUksR0FBRyxNQUFNLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNsQyxJQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFBRSxPQUFPLElBQUksQ0FBQztRQUV6QixJQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUM7WUFDckIsTUFBTSxTQUFTLEdBQUcsTUFBTSxvQkFBSyxDQUFDLDBDQUEwQyxFQUFFO2dCQUN0RSxPQUFPLEVBQUU7b0JBQ0wsZUFBZSxFQUFFLFVBQVUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUU7aUJBQ2pEO2FBQ0osQ0FBQyxDQUFDO1lBRUgsTUFBTSxTQUFTLEdBQUcsTUFBTSxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7WUFFekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDO1lBQ2pDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ1osT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNoQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDWDtRQUVELE9BQU87WUFDSCxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDWCxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhO1lBQ2pDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFlLEVBQUU7Z0JBQ3BELE1BQU0sQ0FBQyxHQUFVLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUN4RCxPQUFPO29CQUNILEVBQUUsRUFBRSxLQUFLLENBQUMsRUFBRTtvQkFDWixJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUk7b0JBQ2hCLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSTtvQkFDaEIsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSztvQkFDckYsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLO2lCQUM1QixDQUFBO1lBQ0wsQ0FBQyxDQUFDO1lBQ0YsS0FBSyxFQUFFLGVBQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztTQUNsQyxDQUFBO0lBQ0wsQ0FBQztDQUNKO0FBdERELHlCQXNEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlcXVlc3QgfSBmcm9tIFwiZXhwcmVzc1wiO1xyXG5pbXBvcnQgeyBBa2Fpcm9DbGllbnQgfSBmcm9tIFwiZGlzY29yZC1ha2Fpcm9cIjtcclxuaW1wb3J0IHsgR3VpbGQgfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xyXG5pbXBvcnQgZmV0Y2ggZnJvbSBcIm5vZGUtZmV0Y2hcIjtcclxuaW1wb3J0IHsgb3duZXJzIH0gZnJvbSBcIi4uL0NvbmZpZ1wiO1xyXG5pbXBvcnQgeyBBUElVc2VyLCBBUElHdWlsZE1pbiB9IGZyb20gXCIuL2ludGVyZmFjZXNcIjtcclxuaW1wb3J0IHNlc3Npb24gZnJvbSBcImV4cHJlc3Mtc2Vzc2lvblwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT0F1dGgyIHtcclxuICAgIHByb3RlY3RlZCBjbGllbnQ6IEFrYWlyb0NsaWVudDtcclxuICAgIHByb3RlY3RlZCBndWlsZHM6IG9iamVjdDtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoY2xpZW50OiBBa2Fpcm9DbGllbnQpe1xyXG4gICAgICAgIHRoaXMuY2xpZW50ID0gY2xpZW50O1xyXG4gICAgICAgIHRoaXMuZ3VpbGRzID0gbmV3IE9iamVjdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyByZXNvbHZlSW5mb3JtYXRpb24ocmVxOiBSZXF1ZXN0KTogUHJvbWlzZTxBUElVc2VyIHwgbnVsbD4ge1xyXG4gICAgICAgIGlmICghcmVxLnNlc3Npb24udG9rZW4pIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICBjb25zdCB1c2VyUmVxID0gYXdhaXQgZmV0Y2goXCJodHRwczovL2Rpc2NvcmQuY29tL2FwaS91c2Vycy9AbWVcIiwge1xyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBcIkF1dGhvcml6YXRpb25cIjogYEJlYXJlciAke3JlcS5zZXNzaW9uLnRva2VufWBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgdXNlclJlcS5qc29uKCk7XHJcbiAgICAgICAgaWYoIXVzZXIuaWQpIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICBpZighdGhpcy5ndWlsZHNbdXNlci5pZF0pe1xyXG4gICAgICAgICAgICBjb25zdCBndWlsZHNSZXEgPSBhd2FpdCBmZXRjaChcImh0dHBzOi8vZGlzY29yZC5jb20vYXBpL3VzZXJzL0BtZS9ndWlsZHNcIiwge1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiQXV0aG9yaXphdGlvblwiOiBgQmVhcmVyICR7cmVxLnNlc3Npb24udG9rZW59YFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGd1aWxkc1JlcyA9IGF3YWl0IGd1aWxkc1JlcS5qc29uKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmd1aWxkc1t1c2VyLmlkXSA9IGd1aWxkc1JlcztcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PntcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmd1aWxkc1t1c2VyLmlkXTtcclxuICAgICAgICAgICAgfSwgM2U1KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGlkOiB1c2VyLmlkLFxyXG4gICAgICAgICAgICB1c2VybmFtZTogdXNlci51c2VybmFtZSxcclxuICAgICAgICAgICAgZGlzY3JpbWluYXRvcjogdXNlci5kaXNjcmltaW5hdG9yLFxyXG4gICAgICAgICAgICBhdmF0YXI6IHVzZXIuYXZhdGFyLFxyXG4gICAgICAgICAgICBndWlsZHM6IHRoaXMuZ3VpbGRzW3VzZXIuaWRdLm1hcCgoZ3VpbGQpOiBBUElHdWlsZE1pbiA9PntcclxuICAgICAgICAgICAgICAgIGNvbnN0IGc6IEd1aWxkID0gdGhpcy5jbGllbnQuZ3VpbGRzLmNhY2hlLmdldChndWlsZC5pZCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBndWlsZC5pZCxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBndWlsZC5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IGd1aWxkLmljb24sXHJcbiAgICAgICAgICAgICAgICAgICAgYWRtaW46IGcgPyBnLm1lbWJlcnMuY2FjaGUuZ2V0KHVzZXIuaWQpLnBlcm1pc3Npb25zLmhhcyhcIk1BTkFHRV9HVUlMRFwiKSA6IGd1aWxkLm93bmVyLFxyXG4gICAgICAgICAgICAgICAgICAgIGludml0ZWQ6IGcgPyB0cnVlIDogZmFsc2VcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIGFkbWluOiBvd25lcnMuaW5jbHVkZXModXNlci5pZClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=