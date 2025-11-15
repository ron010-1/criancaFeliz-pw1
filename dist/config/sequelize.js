"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
exports.default = connectDatabase;
const sequelize_typescript_1 = require("sequelize-typescript");
require("reflect-metadata");
const AssistenteSocial_model_1 = require("../models/AssistenteSocial.model");
const Admin_model_1 = require("../models/Admin.model");
const Beneficiario_model_1 = require("../models/Beneficiario.model");
const Imagem_model_1 = require("../models/Imagem.model");
const Visita_model_1 = require("../models/Visita.model");
const envConfig_1 = require("./envConfig");
const sequelize = new sequelize_typescript_1.Sequelize(envConfig_1.env.DATABASE_URL, {
    dialect: 'postgres',
    models: [AssistenteSocial_model_1.AssistenteSocial, Admin_model_1.Admin, Beneficiario_model_1.Beneficiario, Imagem_model_1.Imagem, Visita_model_1.Visita],
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        }
    }
});
exports.sequelize = sequelize;
async function connectDatabase() {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        console.log('✅ Conexão com o banco de dados estabelecida com sucesso');
        return sequelize;
    }
    catch (error) {
        console.error('❌ Falha ao conectar ao banco de dados:');
        console.error(error);
        process.exit(1);
    }
}
