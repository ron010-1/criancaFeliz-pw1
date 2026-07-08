import { Visita } from "../models/Visita.model";
import { Imagem } from "../models/Imagem.model";

export default class VisitaService {
  static async getAllVisitas(assistenteId?: string) {
    return await Visita.findAndCountAll({
      where: assistenteId ? { assistenteId } : {},
      include: [Imagem],
    });
  }

  static async createVisita(data: any) {
    const { imagens, ...visitaFields } = data;
    const visita = await Visita.create(visitaFields);

    if (Array.isArray(imagens) && imagens.length) {
      await Imagem.bulkCreate(
        imagens.map((url: string) => ({ url, visitaId: visita.uuid })) as any
      );
    }

    return await Visita.findOne({ where: { uuid: visita.uuid }, include: [Imagem] });
  }

  static async getById(id: string) {
    return await Visita.findOne({ where: { uuid: id }, include: [Imagem] });
  }

  static async editVisitaById(id: string, data: any) {
    const { imagens, ...visitaFields } = data;

    const visita = await Visita.findOne({ where: { uuid: id } });
    if (!visita) return null;

    if (Object.keys(visitaFields).length > 0) {
      await visita.update(visitaFields);
    }

    if (imagens !== undefined) {
      await Imagem.destroy({ where: { visitaId: id } });
      if (Array.isArray(imagens) && imagens.length) {
        await Imagem.bulkCreate(imagens.map((url: string) => ({ url, visitaId: id })) as any);
      }
    }

    return await Visita.findOne({ where: { uuid: id }, include: [Imagem] });
  }

  static async deleteVisitaById(id: string) {
    const visita = await Visita.findOne({
      where: { uuid: id },
    });

    if (visita) {
      await Imagem.destroy({ where: { visitaId: id } });
      await visita.destroy();
      return true;
    }
  }
}
