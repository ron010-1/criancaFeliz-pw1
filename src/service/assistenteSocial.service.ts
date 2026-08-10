import { AssistenteSocial } from './../models/AssistenteSocial.model';
import { randomUUID } from "crypto";

export default class AssistenteSocialService {
  static async createAssistenteSocial(assistenteSocialData: any) {
    const assist = {
      ...assistenteSocialData,
      uuid: randomUUID(),
    };
    return await AssistenteSocial.create(assist);
  }

  static async getAllAssistentes(ownUuid?: string){
    return await AssistenteSocial.findAll({
      where: ownUuid ? { uuid: ownUuid } : {},
      attributes: { exclude: ["password"] },
      order: [["nome", "ASC"]],
    });
  }

  static async getById(id: string){
    return await AssistenteSocial.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
  };

  static async getByEmail(email: string) {
    return await AssistenteSocial.findOne({ where: { email } });
  }

  static async editAssistById(id: string, data: any){
    const [updated] = await AssistenteSocial.update(data, {
        where : { uuid: id}
    });
    if (updated) {
      return await this.getById(id);
    };
    return null;
  };


  static async deleteAssistById(id: string) {
    const assistente = await AssistenteSocial.findOne({ where: { uuid: id } });
    if (assistente) {
      await assistente.destroy();
      return true;
    }
    return false;
  }
}
