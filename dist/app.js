"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./logger/logger");
const router_1 = require("./middleware/router/router");
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const isProduction = process.env.NODE_ENV === "production";
/*
const origin = {
    origin: isProduction ? "https://ayushm.dev" : "*"
};
*/
const limiter = express_rate_limit_1.default({
    windowMs: 1 * 60 * 1000,
    max: isProduction ? 5 : 1000 // 5 Requests
});
// Rate limit specific endpoint:
/*
const postLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 1,
})

app.post('/books', postLimiter, addBook)
 */
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
        this.app.use(compression_1.default());
        this.app.use(helmet_1.default());
        this.app.use(limiter);
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map