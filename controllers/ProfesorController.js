//importamos el modelo de la bd
import { TablaProfesor } from '../models/ModelProfesor.js';
import TablaHorario from '../models/ModelHorario.js';
import { TablaAsistencia } from '../models/ModelAsistencia.js';
import db from '../database/db.js';
import bcrypt from 'bcryptjs';
import TablaCurso from '../models/ModelCursos.js';

//mostrar todos los registros
export const getAllprofesores = async (req, res) => {
    try {
        const blogs = await TablaProfesor.findAll();
        res.json(blogs);
    } catch (error) {
        res.json({ message: error.message });
    }
}
//mostrar un registro 
export const getprofesor = async (req, res) => {
    try {
        const blog = await TablaProfesor.findAll({
            where: { id: req.params.id }
        });
        res.json(blog[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}

const validarEmail = (correo) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
};
const validarPassword = (password) => {
    // Al menos 8 caracteres, una letra mayúscula, una minúscula, un número y un carácter especial
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(password);
  };


//crear registro
export const createprofesor = async (req, res) => {
    const { nombre, apellido, dni, telefono, correo, password } = req.body;

    // Validaciones en los campos
    if (!nombre || !apellido || !dni || !telefono || !correo || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    if (!validarEmail(correo)) {
        return res.status(400).json({ message: 'Correo no válido' });
    }

    if (dni.length !== 8 || isNaN(dni)) {
        return res.status(400).json({ message: 'El DNI debe tener 8 dígitos y ser numérico' });
    }

    if (telefono.length < 6 || isNaN(telefono)) {
        return res.status(400).json({ message: 'El teléfono debe ser numérico y tener al menos 6 dígitos' });
    }

    // Verificar si el correo ya está registrado
    const existeProfesor = await TablaProfesor.findOne({ where: { correo } });
    if (existeProfesor) {
        return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    // Verificar si el DNI ya está registrado
    const existeDni = await TablaProfesor.findOne({ where: { dni } });
    if (existeDni) {
        return res.status(400).json({ message: 'El DNI ya está registrado' });
    }
    //aca valida que sea una contrasenia segura
    if (!validarPassword(password)) {
        return res.status(400).json({
          message: 'La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, una minúscula, un número y un carácter especial'
        });
      }

    try {
        // Hashea la contraseña antes de insertarla en la base de datos
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crea un nuevo objeto con la contraseña hasheada
        const nuevoProfesor = {
            ...req.body,
            password: hashedPassword
        };

        // Crea el registro en la base de datos
        await TablaProfesor.create(nuevoProfesor);

        res.json({
            'message': 'Registro creado correctamente'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//actualizar un registro
export const updateprofesor = async (req, res) => {
    try {
        TablaProfesor.update(req.body, {
            where: { id: req.params.id }
        })
        res.json({
            'message': 'registro actualizado correctamente'
        })
    } catch (error) {
        res.json({ message: error.message });
    }
}
//eliminar registro
export const deleteprofesor = async (req, res) => {
    const t = await db.transaction(); // Iniciar una transacción
    try {
      const { id } = req.params;
      const profesor = await TablaProfesor.findByPk(id);
      if (!profesor) {
        return res.status(404).json({ message: 'Profesor no encontrado' });
      }
  
      // Eliminar el profesor (las relaciones serán eliminadas automáticamente por el cascade)
      await profesor.destroy({ transaction: t });
  
      // Confirmar la transacción
      await t.commit();
  
      res.status(200).json({ message: 'Profesor y todas sus relaciones eliminadas con éxito' });
  
    } catch (error) {
      // Si hay algún error, revertimos la transacción
      await t.rollback();
      console.error('Error al eliminar el profesor:', error);
      res.status(500).json({ message: 'Error al procesar la solicitud' });
    }
  };
  







