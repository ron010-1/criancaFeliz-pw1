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

  static async getAllAssistentes(){
    return await AssistenteSocial.findAndCountAll();
  }

  static async getById(id: string){
    return await AssistenteSocial.findByPk(id);
  };

  static async editAssistById(id: string, data: any){
    const [updated] = await AssistenteSocial.update(data, {
        where : { uuid: id}
    });
    if (updated) {
      return await AssistenteSocial.findOne({ where: { uuid: id } });
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
