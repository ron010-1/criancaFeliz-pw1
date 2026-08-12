"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Visita = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Imagem_model_1 = require("./Imagem.model");
const AssistenteSocial_model_1 = require("./AssistenteSocial.model");
const Beneficiario_model_1 = require("./Beneficiario.model");
let Visita = class Visita extends sequelize_typescript_1.Model {
};
exports.Visita = Visita;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID, defaultValue: sequelize_typescript_1.DataType.UUIDV4 })
], Visita.prototype, "uuid", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE)
], Visita.prototype, "date", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Imagem_model_1.Imagem)
], Visita.prototype, "imagens", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], Visita.prototype, "evolucao", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], Visita.prototype, "acompanhamento_familiar", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], Visita.prototype, "estimulo_familiar", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => AssistenteSocial_model_1.AssistenteSocial),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], Visita.prototype, "assistenteId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => AssistenteSocial_model_1.AssistenteSocial)
], Visita.prototype, "assistente", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Beneficiario_model_1.Beneficiario),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID, defaultValue: sequelize_typescript_1.DataType.UUIDV4 })
], Visita.prototype, "beneficiarioId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Beneficiario_model_1.Beneficiario)
], Visita.prototype, "beneficiario", void 0);
exports.Visita = Visita = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'visita',
        timestamps: true
    })
], Visita);
