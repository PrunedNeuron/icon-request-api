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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.DEV_PORT = exports.DB_DATABASE = exports.DB_PORT = exports.DB_PASS = exports.DB_USER = exports.DB_HOST = void 0;
const dotenv = __importStar(require("dotenv"));
// if (process.env.NODE_ENV !== "production") dotenv.config();
dotenv.config();
exports.DB_HOST = process.env.DB_HOST;
exports.DB_USER = process.env.DB_USER;
exports.DB_PASS = process.env.DB_PASS;
exports.DB_PORT = process.env.DB_PORT;
exports.DB_DATABASE = process.env.DB_DATABASE;
exports.DEV_PORT = process.env.DEV_PORT;
exports.PORT = process.env.PORT == undefined ? exports.DEV_PORT : process.env.PORT;
console.log("PORT = " +
    exports.PORT +
    ", process.env.PORT = " +
    process.env.PORT +
    ", DEV_PORT = " +
    exports.DEV_PORT);
//# sourceMappingURL=env.configurer.js.map