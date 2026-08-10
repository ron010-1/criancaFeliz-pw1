"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapVisitaResponse = mapVisitaResponse;
function mapVisitaResponse(visita) {
    const json = visita.toJSON();
    return {
        ...json,
        imagens: Array.isArray(json.imagens) ? json.imagens.map((imagem) => imagem.url) : [],
    };
}
