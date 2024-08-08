import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();
const bd = process.env.BaseDeDatos;
const usuario = process.env.user;
const password = process.env.passw;

const db = new Sequelize(bd, usuario, password,{
    host:'ep-long-moon-a4x0q0np-pooler.us-east-1.aws.neon.tech',
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false // puedes cambiar esto según tu configuración de SSL
        }
      }
})

export default db;

