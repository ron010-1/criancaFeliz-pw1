import bcrypt from "bcrypt";

export async function validatePassword(password: string, userPassword: string){
    return await bcrypt.compare(password, userPassword)
}