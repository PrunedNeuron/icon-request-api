"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const controller_1 = require("./../../controller/controller");
const express_1 = __importDefault(require("express"));
class Router {
    constructor() {
        this.router = express_1.default.Router();
        this.controller = new controller_1.Controller();
    }
    routes(app) {
        console.log("Routing now...");
        app.route("/").get(this.controller.home);
        app.route("/amphetamine")
            .get(this.controller.getIconRequests)
            .post(this.controller.addIconRequest);
        app.route("/amphetamine/id/:id")
            .get(this.controller.getIconRequestById)
            .delete(this.controller.deleteIconRequestById);
        app.route("/amphetamine/component/:component")
            .get(this.controller.getIconRequestByComponent)
            .delete(this.controller.deleteIconRequestByComponent);
    }
}
exports.Router = Router;
exports.default = new Router().router;
//# sourceMappingURL=router.js.map