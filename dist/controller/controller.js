"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const icon_request_model_1 = __importDefault(require("../model/icon.request.model"));
const database_1 = require("../database/database");
class Controller {
    home(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            response.status(200).send({
                message: "GET request received for /amphetamine. However, this is not a URL the API uses."
            });
        });
    }
    addIconRequest(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = request.body;
                console.log(request.body);
                const iconRequest = new icon_request_model_1.default(body["name"], body["component"], body["url"]);
                const queryResult = yield database_1.pool.query("INSERT INTO icon_requests (name, component, url) VALUES ($1, $2, $3) RETURNING *", [iconRequest.name, iconRequest.component, iconRequest.url]);
                response.json({
                    message: "Icon request successfully added.",
                    icon: queryResult.rows[0]
                });
                // return queryResult;
            }
            catch (error) {
                console.error(error.message);
                response.send(error.message);
            }
        });
    }
    getIconRequests(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryResult = yield database_1.pool.query("SELECT * FROM icon_requests");
                response.json(queryResult.rows);
            }
            catch (error) {
                console.error(error.message);
            }
        });
    }
    getIconRequestById(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const queryResult = yield database_1.pool.query("SELECT * FROM icon_requests WHERE id = $1", [id]);
                response.json(queryResult.rows[0]);
            }
            catch (error) {
                console.error(error.message);
            }
        });
    }
    getIconRequestByComponent(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { component } = request.params;
                const queryResult = yield database_1.pool.query("SELECT * FROM icon_requests WHERE component = $1", [component]);
                response.json(queryResult.rows[0]);
            }
            catch (error) {
                console.error(error.message);
            }
        });
    }
    deleteIconRequestById(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const iconRequest = this.findIconRequestById(id);
                const queryResult = yield database_1.pool.query("DELETE FROM icon_requests WHERE id = $1", [id]);
                console.log(queryResult.rows);
                response.json({
                    message: "success",
                    deleted_request: { iconRequest }
                });
            }
            catch (error) {
                console.error(error.message);
            }
        });
    }
    deleteIconRequestByComponent(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { component } = request.params;
                const iconRequest = this.findIconRequestByComponent(component);
                const queryResult = yield database_1.pool.query("DELETE FROM icon_requests WHERE component = $1", [component]);
                response.json({
                    message: "success",
                    deleted_request: { iconRequest }
                });
                console.log(queryResult.rows);
            }
            catch (error) {
                console.error(error.message);
            }
        });
    }
    findIconRequestByComponent(component) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryResult = yield database_1.pool.query("SELECT * FROM icon_requests WHERE component = $1", [component]);
                const result = queryResult.rows[0];
                const iconRequest = new icon_request_model_1.default(result["name"], result["component"], result["url"]);
                return iconRequest;
            }
            catch (error) {
                console.error(error.message);
            }
        });
    }
    findIconRequestById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryResult = yield database_1.pool.query("SELECT * FROM icon_requests WHERE id = $1", [id]);
                const result = queryResult.rows[0];
                const iconRequest = new icon_request_model_1.default(result["name"], result["component"], result["url"]);
                return iconRequest;
            }
            catch (error) {
                console.error(error.message);
            }
        });
    }
}
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map