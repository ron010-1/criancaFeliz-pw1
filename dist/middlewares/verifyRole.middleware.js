"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRole = verifyRole;
const appError_1 = require("../errors/appError");
function verifyRole(...roles) {
    return (req, res, next) => {
        if (!req.userRole || !roles.includes(req.userRole)) {
            throw new appError_1.AppErrosCustom("Acesso negado para este papel de usuário", 403);
        }
        next();
    };
}
