"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const HttpStatusCodes = __importStar(require("http-status-codes"));
const icon_request_model_1 = __importDefault(require("../model/icon.request.model"));
const database_1 = require("../database/database");
class Controller {
    notFound(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            response.status(404).send({
                message: "HTTP request received. However, this is not a URL the API uses. Try /amphetamine/api/v1/ instead"
            });
        });
    }
    addIconRequests(request, response) {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const iconRequests = request.body["icons"];
                try {
                    for (var _b = __asyncValues(request.body["icons"]), _c; _c = yield _b.next(), !_c.done;) {
                        const iconRequest = _c.value;
                        // Add requests to the database
                        const queryResult = yield database_1.pool.query("INSERT INTO icon_requests (name, component, url) VALUES ($1, $2, $3) RETURNING *", [iconRequest.name, iconRequest.component, iconRequest.url]);
                        console.log(queryResult.rows[0]);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                response.status(HttpStatusCodes.OK).json({
                    status: "SUCCESS",
                    message: `Added ${iconRequests.length} icon requests.`
                });
            }
            catch (error) {
                console.error(error.message);
            }
        });
    }
    addIconRequest(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = JSON.parse(request.body);
                console.log(body);
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
                // response.json(queryResult.rows);
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
    getIconRequestByName(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = request.params;
                const param = "%" + name.toLowerCase() + "%";
                console.log(name);
                const queryResult = yield database_1.pool.query("SELECT * FROM icon_requests WHERE LOWER(name) LIKE $1", [param]);
                console.log(queryResult.rows);
                response.json(queryResult.rows);
            }
            catch (error) {
                console.error(error.message);
            }
        });
    }
}
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map