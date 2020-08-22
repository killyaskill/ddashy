"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_akairo_1 = require("discord-akairo");
const API_1 = __importDefault(require("../../API/API"));
class ReadyListener extends discord_akairo_1.Listener {
    constructor() {
        super("ready", {
            emitter: "client",
            event: "ready",
            category: "client"
        });
    }
    exec() {
        console.log(`${this.client.user.tag} has loaded its files and is ready!`);
        new API_1.default(this.client).start();
    }
}
exports.default = ReadyListener;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVhZHlMaXN0ZW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saXN0ZW5lcnMvY2xpZW50L1JlYWR5TGlzdGVuZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxtREFBMEM7QUFDMUMsd0RBQWdDO0FBQ2hDLE1BQXFCLGFBQWMsU0FBUSx5QkFBUTtJQUMvQztRQUNJLEtBQUssQ0FBQyxPQUFPLEVBQUU7WUFDWCxPQUFPLEVBQUUsUUFBUTtZQUNqQixLQUFLLEVBQUUsT0FBTztZQUNkLFFBQVEsRUFBRSxRQUFRO1NBQ3JCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDTSxJQUFJO1FBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcscUNBQXFDLENBQUMsQ0FBQztRQUUxRSxJQUFJLGFBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakMsQ0FBQztDQUNKO0FBYkQsZ0NBYUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMaXN0ZW5lciB9IGZyb20gXCJkaXNjb3JkLWFrYWlyb1wiO1xyXG5pbXBvcnQgQVBJIGZyb20gXCIuLi8uLi9BUEkvQVBJXCI7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlYWR5TGlzdGVuZXIgZXh0ZW5kcyBMaXN0ZW5lciB7XHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoXCJyZWFkeVwiLCB7XHJcbiAgICAgICAgICAgIGVtaXR0ZXI6IFwiY2xpZW50XCIsXHJcbiAgICAgICAgICAgIGV2ZW50OiBcInJlYWR5XCIsXHJcbiAgICAgICAgICAgIGNhdGVnb3J5OiBcImNsaWVudFwiXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZXhlYygpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhgJHt0aGlzLmNsaWVudC51c2VyLnRhZ30gaGFzIGxvYWRlZCBpdHMgZmlsZXMgYW5kIGlzIHJlYWR5IWApO1xyXG5cclxuICAgICAgICBuZXcgQVBJKHRoaXMuY2xpZW50KS5zdGFydCgpO1xyXG4gICAgfVxyXG59Il19