// Importamos la conexión a la DB
import db from "../database/db.js";
// Importamos Sequelize
import { DataTypes } from "sequelize";

// Modelo para la tabla 'cursos'
const TablaCurso = db.define('cursos', {
    cursoid: {  // Cambiado a minúsculas
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    anio: {  // Cambiado a minúsculas
      type: DataTypes.INTEGER,
      allowNull: false
    },
    division: {  // Cambiado a minúsculas
      type: DataTypes.STRING(10),
      allowNull: true
    }
  }, {
    timestamps: false
  });
  
export default TablaCurso;
