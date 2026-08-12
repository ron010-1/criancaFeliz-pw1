"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exceptionsVerify = exceptionsVerify;
const appError_1 = require("../errors/appError");
const appErrorZods_1 = require("../errors/appErrorZods");
function exceptionsVerify(error, req, res, next) {
    if (error instanceof appError_1.AppErrosCustom) {
        res.status(error.statusCode).json({ message: error.message });
        return;
    }
    if (error instanceof appErrorZods_1.AppErrorsZod) {
        res.status(error.statusCode).json({ message: error.message });
        return;
    }
    console.error(error);
    res.status(500).json({
        status: "Error",
        message: "Internal server error or database error",
    });
}
