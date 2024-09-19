// Importamos la conexión a la DB
import db from "../database/db.js";
// Importamos Sequelize
import { DataTypes } from "sequelize";

// Modelo para la tabla 'horarios'
const TablaHorario = db.define('horarios', {
  horarioid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  dia: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  cursoid: {  // Cambiado a minúsculas
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'cursos',
      key: 'cursoid'  // Cambiado a minúsculas
    }
  },
  profesorid: {  // Cambiado a minúsculas
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'profesores',
      key: 'id'  // Esto permanece igual
    }
  },
  materiaid: {  // Cambiado a minúsculas
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'materias',
      key: 'materiaid'  // Cambiado a minúsculas
    }
  },
  fechainicio: {
    type: DataTypes.TIME,
    allowNull: true
  },
  fechafin: {  
    type: DataTypes.TIME,
    allowNull: true
  }
}, {
  timestamps: false
});

export default TablaHorario;
