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
        // https://icon-requests-api.herokuapp.com/amphetamine/api/v1
        app.route("/amphetamine/api/v1")
            .get(this.controller.getIconRequests)
            .post(this.controller.addIconRequests)
            .delete(this.controller.notFound)
            .put(this.controller.notFound);
        app.route("/amphetamine/api/v1/id/:id")
            .get(this.controller.getIconRequestById)
            .delete(this.controller.deleteIconRequestById)
            .put(this.controller.notFound)
            .post(this.controller.notFound);
        app.route("/amphetamine/api/v1/component/:component")
            .get(this.controller.getIconRequestByComponent)
            .delete(this.controller.deleteIconRequestByComponent)
            .post(this.controller.notFound)
            .put(this.controller.notFound);
        app.route("/amphetamine/api/v1/name/:name")
            .get(this.controller.getIconRequestByName)
            .put(this.controller.notFound)
            .post(this.controller.notFound)
            .delete(this.controller.notFound);
        app.route("/*").all(this.controller.notFound);
    }
}
exports.Router = Router;
exports.default = new Router().router;
//# sourceMappingURL=router.js.map