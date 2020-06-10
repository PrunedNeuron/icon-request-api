"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const env_configurer_1 = require("./configuration/env.configurer");
const app_1 = __importDefault(require("./app"));
exports.server = app_1.default.listen(env_configurer_1.PORT, () => {
    console.log(`Express server running on http://${env_configurer_1.DB_HOST}:${env_configurer_1.PORT}`);
});
//# sourceMappingURL=server.js.map