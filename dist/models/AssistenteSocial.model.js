"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssistenteSocial = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Admin_model_1 = require("./Admin.model");
const Visita_model_1 = require("./Visita.model");
const Beneficiario_model_1 = require("./Beneficiario.model");
let AssistenteSocial = class AssistenteSocial extends sequelize_typescript_1.Model {
};
exports.AssistenteSocial = AssistenteSocial;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], AssistenteSocial.prototype, "uuid", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], AssistenteSocial.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], AssistenteSocial.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], AssistenteSocial.prototype, "telefone", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], AssistenteSocial.prototype, "nome", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Admin_model_1.Admin),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], AssistenteSocial.prototype, "adminId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Admin_model_1.Admin)
], AssistenteSocial.prototype, "admin", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Visita_model_1.Visita)
], AssistenteSocial.prototype, "visitas", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Beneficiario_model_1.Beneficiario)
], AssistenteSocial.prototype, "beneficiarios", void 0);
exports.AssistenteSocial = AssistenteSocial = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'assistente_social',
        timestamps: true
    })
], AssistenteSocial);
