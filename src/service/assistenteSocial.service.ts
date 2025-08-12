import { randomUUID } from "crypto";
import { AssistenteSocial } from "../models/AssistenteSocial.model";

export default class AssistenteSocialService {
  static async createAssistenteSocial(assistenteSocialData: any) {
    const assist = {
      ...assistenteSocialData,
      uuid: randomUUID(),
    };
    return await AssistenteSocial.create(assist);
  }
}
