import express from 'express';
import { createprofesor, deleteprofesor, getAllprofesores, getprofesor, updateprofesor } from '../controllers/ProfesorController.js';
import login from '../controllers/LoginController.js';
import { contarAsistenciasEinasistencias, registrarAsistencia } from '../controllers/AsistenciaController.js';
import { ListadoCursos } from '../controllers/CursosController.js';
import insertarHorario from '../controllers/HoriariosController.js'
import {insertarMateria, ListadoMaterias} from '../controllers/MateriasController.js'

const router = express.Router();

/* Rutas para Profesores */
router.get('/profesores', getAllprofesores); // Obtiene todos los profesores
router.get('/profesores/:id', getprofesor);  // Obtiene un profesor por ID
router.post('/profesores', createprofesor);  // Crea un nuevo profesor
router.put('/profesores/:id', updateprofesor); // Actualiza un profesor por ID
router.delete('/profesores/:id', deleteprofesor); // Elimina un profesor por ID

/* Rutas para Asistencia */
router.post('/login/asistencia', registrarAsistencia);  // Registra la asistencia
router.get('/login/contarAsistencias/:profesorId', contarAsistenciasEinasistencias); // Cuenta asistencias por profesor

/* Rutas para Cursos */
router.get('/listado/cursos', ListadoCursos); // todos los cursos

/* Ruta de Login */
router.post('/login', login);  // Maneja el login

/* ruta para horarios*/
router.post('/insertar/horario', insertarHorario);

/* ruta para materias */
router.post('/insertar/materias', insertarMateria);
router.get('/listado/materias', ListadoMaterias);


// Exportamos el router
export default router;
