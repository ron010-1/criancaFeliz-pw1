"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppErrorsZod = void 0;
class AppErrorsZod {
    constructor(message, statusCode) {
        this.message = message;
        this.statusCode = statusCode;
    }
}
exports.AppErrorsZod = AppErrorsZod;
