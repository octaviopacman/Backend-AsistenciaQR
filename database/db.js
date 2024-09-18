import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
import pg from "pg"
dotenv.config();
const bd = process.env.POSTGRES_DATABASE;
const usuario = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;

const db = new Sequelize(bd, usuario, password,{
    host:'ep-long-moon-a4x0q0np-pooler.us-east-1.aws.neon.tech',
    dialect: 'postgres',
    dialectModule:pg,
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false // puedes cambiar esto según tu configuración de SSL
        }
      }
})

export default db;

