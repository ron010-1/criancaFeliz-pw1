import { Visita } from "../models/Visita.model";

export function mapVisitaResponse(visita: Visita) {
  const json = visita.toJSON() as any;
  return {
    ...json,
    imagens: Array.isArray(json.imagens) ? json.imagens.map((imagem: any) => imagem.url) : [],
  };
}
