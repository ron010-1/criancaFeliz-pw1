"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const envConfig_1 = require("./config/envConfig");
const sequelize_1 = __importDefault(require("./config/sequelize"));
const beneficiario_route_1 = __importDefault(require("./routes/beneficiario.route"));
const visita_route_1 = __importDefault(require("./routes/visita.route"));
const login_route_1 = require("./routes/login.route");
const assistenteSocial_route_1 = __importDefault(require("./routes/assistenteSocial.route"));
const createDefaultAdmin_1 = require("./config/createDefaultAdmin");
const errorsVerify_1 = require("./middlewares/errorsVerify");
const swagger_1 = __importDefault(require("./swagger"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/visitas", visita_route_1.default);
app.use("/benefs", beneficiario_route_1.default);
app.use("/assists", assistenteSocial_route_1.default);
app.use("/login", login_route_1.LoginRouter);
app.use(errorsVerify_1.exceptionsVerify);
(0, swagger_1.default)(app);
const port = process.env.PORT || '0.0.0.0';
app.listen(process.env.PORT || envConfig_1.env.PORT || '0.0.0.0', async () => {
    try {
        await (0, sequelize_1.default)();
        await (0, createDefaultAdmin_1.createDefaultAdmin)();
        console.log(`🚀 Server is running on port ${port}`);
    }
    catch (error) {
        console.error("Erro na inicialização:", error);
        process.exit(1);
    }
});
//teste
