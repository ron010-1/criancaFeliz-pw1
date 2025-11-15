"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Beneficiario = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Visita_model_1 = require("./Visita.model");
const AssistenteSocial_model_1 = require("./AssistenteSocial.model");
let Beneficiario = class Beneficiario extends sequelize_typescript_1.Model {
};
exports.Beneficiario = Beneficiario;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID, defaultValue: sequelize_typescript_1.DataType.UUIDV4 })
], Beneficiario.prototype, "uuid", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], Beneficiario.prototype, "nome", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], Beneficiario.prototype, "nome_responsavel", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], Beneficiario.prototype, "data_nascimento", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], Beneficiario.prototype, "phone1", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], Beneficiario.prototype, "phone2", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.GEOMETRY('POINT', 4326),
        allowNull: false
    })
], Beneficiario.prototype, "location", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Visita_model_1.Visita)
], Beneficiario.prototype, "visitas", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => AssistenteSocial_model_1.AssistenteSocial),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], Beneficiario.prototype, "assistenteId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => AssistenteSocial_model_1.AssistenteSocial)
], Beneficiario.prototype, "assistente", void 0);
exports.Beneficiario = Beneficiario = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'beneficiario',
        timestamps: true
    })
], Beneficiario);
