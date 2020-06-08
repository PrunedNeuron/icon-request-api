"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
class Logger {
    constructor() {
        // Do nothing
    }
    info(log) {
        console.log(new Date() + "info::::" + log);
    }
    debug(log) {
        console.log(new Date() + "debug::::" + log);
    }
    error(log) {
        console.log(new Date() + "error::::" + log);
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map