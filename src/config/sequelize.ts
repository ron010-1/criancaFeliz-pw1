import { Sequelize } from 'sequelize-typescript';
import 'reflect-metadata';
import { AssistenteSocial } from '../models/AssistenteSocial.model';
import { Admin } from '../models/Admin.model';
import { Beneficiario } from '../models/Beneficiario.model';
import { Imagem } from '../models/Imagem.model';
import { Visita } from '../models/Visita.model';
import { env } from './envConfig';

const sequelize = new Sequelize(env.DATABASE_URL, {
  dialect: 'postgres',
  models: [AssistenteSocial, Admin, Beneficiario, Imagem, Visita],
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
});

export default async function connectDatabase() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log('✅ Conexão com o banco de dados estabelecida com sucesso');
    return sequelize;
  } catch (error) {
    console.error('❌ Falha ao conectar ao banco de dados:');
    console.error(error);
    process.exit(1);
  }
}

export { sequelize };