"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const cors_1 = __importDefault(require("cors"));
const OAuth2Router_1 = __importDefault(require("./rooters/OAuth2Router"));
const GuildRooter_1 = __importDefault(require("./rooters/GuildRooter"));
const OAuth2_1 = __importDefault(require("../structures/OAuth2"));
class API {
    constructor(client) {
        this.client = client;
        this.oauth = new OAuth2_1.default(this.client);
    }
    start() {
        this.server = express_1.default();
        this.server.use(express_1.default.json());
        this.server.use(cors_1.default({
            origin: true,
            credentials: true
        }));
        new OAuth2Router_1.default(this.server, this.client, this.oauth);
        new GuildRooter_1.default(this.server, this.client);
        http_1.createServer(this.server).listen(3306, () => console.log("API is online."));
    }
}
exports.default = API;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQVBJLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0FQSS9BUEkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxzREFBK0M7QUFDL0MsK0JBQW9DO0FBQ3BDLGdEQUF3QjtBQUV4QiwwRUFBa0Q7QUFDbEQsd0VBQWdEO0FBQ2hELGtFQUEwQztBQUUxQyxNQUFxQixHQUFHO0lBS3BCLFlBQW1CLE1BQW9CO1FBQ25DLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxnQkFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRU0sS0FBSztRQUNSLElBQUksQ0FBQyxNQUFNLEdBQUcsaUJBQU8sRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxjQUFJLENBQUM7WUFDakIsTUFBTSxFQUFFLElBQUk7WUFDWixXQUFXLEVBQUUsSUFBSTtTQUNwQixDQUFDLENBQUMsQ0FBQztRQUVKLElBQUksc0JBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZELElBQUkscUJBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUUxQyxtQkFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQVMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFBO0lBQ3JGLENBQUM7Q0FDSjtBQXZCRCxzQkF1QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBa2Fpcm9DbGllbnQgfSBmcm9tIFwiZGlzY29yZC1ha2Fpcm9cIjtcclxuaW1wb3J0IGV4cHJlc3MsIHsgQXBwbGljYXRpb24gfSBmcm9tIFwiZXhwcmVzc1wiO1xyXG5pbXBvcnQgeyBjcmVhdGVTZXJ2ZXIgfSBmcm9tIFwiaHR0cFwiO1xyXG5pbXBvcnQgY29ycyBmcm9tIFwiY29yc1wiO1xyXG5cclxuaW1wb3J0IE9BdXRoMlJvdXRlciBmcm9tIFwiLi9yb290ZXJzL09BdXRoMlJvdXRlclwiO1xyXG5pbXBvcnQgR3VpbGRSb3V0ZXIgZnJvbSBcIi4vcm9vdGVycy9HdWlsZFJvb3RlclwiO1xyXG5pbXBvcnQgT0F1dGgyIGZyb20gXCIuLi9zdHJ1Y3R1cmVzL09BdXRoMlwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQVBJIHtcclxuICAgIHByb3RlY3RlZCBjbGllbnQ6IEFrYWlyb0NsaWVudDtcclxuICAgIHByb3RlY3RlZCBzZXJ2ZXI6IEFwcGxpY2F0aW9uO1xyXG4gICAgcHJvdGVjdGVkIG9hdXRoOiBPQXV0aDI7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGNsaWVudDogQWthaXJvQ2xpZW50KSB7XHJcbiAgICAgICAgdGhpcy5jbGllbnQgPSBjbGllbnQ7XHJcbiAgICAgICAgdGhpcy5vYXV0aCA9IG5ldyBPQXV0aDIodGhpcy5jbGllbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGFydCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNlcnZlciA9IGV4cHJlc3MoKTtcclxuICAgICAgICB0aGlzLnNlcnZlci51c2UoZXhwcmVzcy5qc29uKCkpO1xyXG4gICAgICAgIHRoaXMuc2VydmVyLnVzZShjb3JzKHtcclxuICAgICAgICAgICAgb3JpZ2luOiB0cnVlLFxyXG4gICAgICAgICAgICBjcmVkZW50aWFsczogdHJ1ZVxyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgbmV3IE9BdXRoMlJvdXRlcih0aGlzLnNlcnZlciwgdGhpcy5jbGllbnQsIHRoaXMub2F1dGgpO1xyXG4gICAgICAgIG5ldyBHdWlsZFJvdXRlcih0aGlzLnNlcnZlciwgdGhpcy5jbGllbnQpO1xyXG5cclxuICAgICAgICBjcmVhdGVTZXJ2ZXIodGhpcy5zZXJ2ZXIpLmxpc3RlbigzMzA2LCAoKTogdm9pZCA9PiBjb25zb2xlLmxvZyhcIkFQSSBpcyBvbmxpbmUuXCIpKVxyXG4gICAgfVxyXG59Il19