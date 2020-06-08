"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./logger/logger");
const router_1 = require("./middleware/router/router");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
class App {
    constructor() {
        this.app = express_1.default();
        this.logger = new logger_1.Logger();
        this.attachMiddleware();
        this.router = new router_1.Router();
        this.router.routes(this.app);
    }
    attachMiddleware() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(cors_1.default());
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map