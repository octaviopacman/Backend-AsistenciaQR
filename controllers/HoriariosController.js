import TablaCurso from '../models/ModelCursos.js'
import { TablaProfesor } from '../models/ModelProfesor.js';
import TablaHorario from '../models/ModelHorario.js';
import { TablaAsistencia } from '../models/ModelAsistencia.js';
import TablaMateria from '../models/ModelMateria.js';

// Funcion para formatear el tiempo en HH:MM si es necesario
function formatTime(time) {
  // Si ya tiene el formato HH:MM, retorna tal cual, sino lo ajusta
  return time.length === 5 ? time + ":00" : time;
}

const insertarHorario = async (req, res) => {
  const { nombreProfesor, nombreCurso, nombreMateria, dia, fechaInicio, fechaFin } = req.body;
  try {
    // Buscar el ProfesorID
    const profesor = await TablaProfesor.findOne({ where: { nombre: nombreProfesor } });
    if (!profesor) {
      return res.status(404).json({ error: 'Profesor no encontrado' });
    }

    // Buscar el CursoID
    const [anioTexto, division] = nombreCurso.split(' ');
    const anio = parseInt(anioTexto);  // Convertir "1ro" a 1

    const curso = await TablaCurso.findOne({
      attributes: ['cursoid', 'anio', 'division'],  // Usa los nombres de columnas en minúsculas
      where: { anio: anio, division: division }
    });
    console.log('Curso ID:', curso.cursoid);

    if (!curso) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }

    // Buscar el MateriaID
    const materia = await TablaMateria.findOne({ where: { nombremateria: nombreMateria } });
    if (!materia) {
      return res.status(404).json({ error: 'Materia no encontrada' });
    }

    // Formatear fechaInicio y fechaFin en HH:MM:SS
    const formattedFechaInicio = formatTime(fechaInicio);  // Formatear a HH:MM:SS
    const formattedFechaFin = formatTime(fechaFin);        // Formatear a HH:MM:SS

    console.log('Feeecha Inicio:', formattedFechaInicio);
    console.log('Feeecha Fin:', formattedFechaFin);

    console.log('Profesor encontrado:', profesor);
    console.log('Curso encontrado:', curso);
    console.log('Materia encontrada:', materia);

    // Insertar el nuevo horario
    const nuevoHorario = await TablaHorario.create({
      profesorid: profesor.id,  // profesor.id debería estar correcto
      cursoid: curso.cursoid,   // curso.cursoid debería estar correcto
      materiaid: materia.materiaid,  // materia.materiaid debería estar correcto
      dia: dia,
      fechainicio: formattedFechaInicio,
      fechafin: formattedFechaFin
    });
    
    
    return res.status(201).json({ message: 'Horario insertado exitosamente', nuevoHorario });
  } catch (error) {
    console.error('Error al insertar el horario:', error);
    return res.status(500).json({ error: 'Error al insertar el horario' });
  }
};


export default insertarHorario;



















