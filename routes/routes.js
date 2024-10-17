import express from 'express';
import { createprofesor, deleteprofesor, getAllprofesores, getprofesor, updateprofesor } from '../controllers/ProfesorController.js';
import login from '../controllers/LoginController.js';
import { contarAsistenciasEinasistencias, registrarAsistencia } from '../controllers/AsistenciaController.js';
import { ListadoCursos, crearCurso } from '../controllers/CursosController.js';
import {insertarHorario, mostrarhorariocurso, mostrarhorarioprofesor} from '../controllers/HoriariosController.js'
import {insertarMateria, ListadoMaterias} from '../controllers/MateriasController.js'

const router = express.Router();

//http://localhost:8000/api
/* Rutas para Profesores */
router.get('/profesores', getAllprofesores); // Obtiene todos los profesores
router.get('/profesores/:id', getprofesor);  // Obtiene un profesor por ID
router.post('/profesores', createprofesor);  // Crea un nuevo profesor
router.put('/profesores/:id', updateprofesor); // Actualiza un profesor por ID
router.delete('/profesores/:id', deleteprofesor); // Elimina un profesor por ID

/* Rutas para Asistencia */
router.post('/login/asistencia', registrarAsistencia);  // Registra la asistencia
router.get('/login/contarasistencias', contarAsistenciasEinasistencias); // Cuenta asistencias usando el token

/* Rutas para Cursos */
router.get('/listado/cursos', ListadoCursos); // todos los cursos

router.post('/crear/curso', crearCurso);// Ruta para crear un curso

/* Ruta de Login */
router.post('/login', login);  // Maneja el login

/* ruta para horarios*/
router.post('/insertar/horario', insertarHorario);
router.get('/listado/horario/profesor', mostrarhorarioprofesor);
router.get('/listado/horario/curso', mostrarhorariocurso);

/* ruta para materias */
router.post('/insertar/materias', insertarMateria);
router.get('/listado/materias', ListadoMaterias);


// Exportamos el router
export default router;
