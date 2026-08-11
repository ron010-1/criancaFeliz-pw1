"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertOwnership = assertOwnership;
const appError_1 = require("../errors/appError");
function assertOwnership(req, ownerId, message = "Você só pode acessar recursos cadastrados por você.") {
    if (req.userRole === "admin")
        return;
    if (ownerId !== req.userId) {
        throw new appError_1.AppErrosCustom(message, 403);
    }
}
