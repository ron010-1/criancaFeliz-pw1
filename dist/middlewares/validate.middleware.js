"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = validate;
const appErrorZods_1 = require("../errors/appErrorZods");
function validate(schema, source = "body") {
    return (req, res, next) => {
        const result = schema.safeParse(req[source]);
        if (!result.success) {
            throw new appErrorZods_1.AppErrorsZod(result.error.flatten().fieldErrors, 400);
        }
        req[source] = result.data;
        next();
    };
}
