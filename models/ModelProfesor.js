import db from "../database/db.js";
import { DataTypes } from "sequelize";
import Curso from './ModelCursos.js'; // Importa el modelo Curso
import Asistencia from './ModelAsistencia.js'; // Importa el modelo Asistencia
import Horario from './ModelHorario.js'; // Importa el modelo Horario

export const TablaProfesor = db.define('profesores', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 50],
      notEmpty: true
    }
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 50],
      notEmpty: true
    }
  },
  dni: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isNumeric: true,
      len: [8, 8]
    }
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isNumeric: true,
      len: [6, 15]
    }
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8, 100],
      notEmpty: true
    }
  }
}, {
  timestamps: false
});

// Relación entre Profesor y Curso
TablaProfesor.hasMany(Curso, { foreignKey: 'profesorId', onDelete: 'CASCADE' });

// Relación entre Profesor y Asistencia
TablaProfesor.hasMany(Asistencia, { foreignKey: 'profesorId', onDelete: 'CASCADE' });

// Relación entre Profesor y Horario
TablaProfesor.hasMany(Horario, { foreignKey: 'profesorId', onDelete: 'CASCADE' }); 
