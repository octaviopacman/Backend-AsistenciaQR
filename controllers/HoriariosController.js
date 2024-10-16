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

export const insertarHorario = async (req, res) => {
  const { profesorId, cursoId, materiaId, dia, fechaInicio, fechaFin } = req.body;

  try {
    // Buscar el Profesor por ID
    const profesor = await TablaProfesor.findByPk(profesorId);
    if (!profesor) {
      return res.status(404).json({ error: 'Profesor no encontrado' });
    }

    // Buscar el Curso por ID
    const curso = await TablaCurso.findByPk(cursoId);
    if (!curso) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }

    // Buscar la Materia por ID
    const materia = await TablaMateria.findByPk(materiaId);
    if (!materia) {
      return res.status(404).json({ error: 'Materia no encontrada' });
    }

    // Formatear fechaInicio y fechaFin en HH:MM:SS
    const formattedFechaInicio = formatTime(fechaInicio);  // Formatear a HH:MM:SS
    const formattedFechaFin = formatTime(fechaFin);        // Formatear a HH:MM:SS

    // Insertar el nuevo horario
    const nuevoHorario = await TablaHorario.create({
      profesorid: profesorId,
      cursoid: cursoId,
      materiaid: materiaId,
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


export const mostrarhorarioprofesor = async (req, res) => {
  try {
    const { profesorId } = req.body;

    // Buscar el profesor por ID
    const profesor = await TablaProfesor.findByPk(profesorId);

    if (!profesor) {
      return res.status(404).json({ error: 'Profesor no encontrado' });
    }

    // Obtener los horarios del profesor
    const horarios = await TablaHorario.findAll({
      where: { profesorid: profesorId },
      include: [{ model: TablaCurso }, { model: TablaMateria }]
    });

    return res.json(horarios);
  } catch (error) {
    console.error('Error al obtener horarios:', error);
    return res.status(500).json({ error: 'Error al obtener horarios' });
  }
};


export const mostrarhorariocurso = async (req, res) => {
  try {
    const { cursoId } = req.body;

    // Buscar el curso por ID
    const curso = await TablaCurso.findByPk(cursoId);

    if (!curso) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }

    // Obtener los horarios del curso
    const horarios = await TablaHorario.findAll({
      where: { cursoid: cursoId },
      include: [{ model: TablaProfesor }, { model: TablaMateria }]
    });

    return res.json(horarios);
  } catch (error) {
    console.error('Error al obtener horarios:', error);
    return res.status(500).json({ error: 'Error al obtener horarios' });
  }
};




















