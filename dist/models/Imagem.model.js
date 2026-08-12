"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Imagem = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Visita_model_1 = require("./Visita.model");
let Imagem = class Imagem extends sequelize_typescript_1.Model {
};
exports.Imagem = Imagem;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID, defaultValue: sequelize_typescript_1.DataType.UUIDV4 })
], Imagem.prototype, "uuid", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], Imagem.prototype, "url", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Visita_model_1.Visita),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID })
], Imagem.prototype, "visitaId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Visita_model_1.Visita)
], Imagem.prototype, "visita", void 0);
exports.Imagem = Imagem = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'imagem',
        timestamps: true
    })
], Imagem);
