///ModelHorario
// Importamo la conexión a la DB
import db from "../database/db.js";
// Importamos Sequelize
import { DataTypes } from "sequelize";

// Modelo para la tabla 'horarios'
const TablaHorario = db.define('horarios', {
  HorarioID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Dia: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  CursoID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'cursos',
      key: 'CursoID'
    }
  },
  ProfesorID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'profesores',
      key: 'id'
    }
  },
  MateriaID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'materias',
      key: 'MateriaID'
    }
  },
  fechaInicio: {
    type: DataTypes.TIME,
    allowNull: true
  },
  fechaFin: {  
    type: DataTypes.TIME,
    allowNull: true
  }
}, {
  timestamps: false
});

  
export default TablaHorario;
