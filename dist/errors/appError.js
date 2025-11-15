"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppErrosCustom = void 0;
class AppErrosCustom {
    constructor(message, statusCode) {
        this.statusCode = statusCode;
        this.message = message;
    }
}
exports.AppErrosCustom = AppErrosCustom;
