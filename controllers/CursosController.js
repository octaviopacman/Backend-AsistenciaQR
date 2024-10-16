import TablaCurso from '../models/ModelCursos.js';

// Función para listar los cursos en la base de datos
export const ListadoCursos = async (req, res) => {
  try {
    const cursos = await TablaCurso.findAll(); // Obtener todos los cursos
    res.json(cursos); // Enviar los cursos como respuesta
  } catch (error) {
    console.error('Error al obtener cursos:', error); // Manejar el error correctamente
    res.status(500).send('Error al obtener cursos');
  }
};

// Validación de datos de entrada para crear un curso
const validarCurso = (anio, division) => {
  const regexDivision = /^(1ra|2da|3ra|4ta)$/;  // Divisiones válidas en formato ordinal
  return (
    Number.isInteger(anio) && anio >= 1 && anio <= 7 && // Validar que el año esté entre 1 y 7
    regexDivision.test(division) // Validar que la división esté en el formato correcto
  );
};

// Función para crear un nuevo curso
export const crearCurso = async (req, res) => {
  const { anio, division } = req.body;

  // Validar los datos de entrada
  if (!validarCurso(anio, division)) {
    return res.status(400).json({ message: 'Datos inválidos. El año debe estar entre 1 y 7 y la división debe ser válida (1ra, 2da, 3ra, 4ta)' });
  }

  try {
    // Verificar si el curso ya existe en la base de datos
    const cursoExistente = await TablaCurso.findOne({ where: { anio, division } });
    if (cursoExistente) {
      return res.status(400).json({ message: 'El curso ya existe' });
    }

    // Crear el nuevo curso
    const nuevoCurso = await TablaCurso.create({ anio, division });

    res.status(201).json({
      message: 'Curso creado exitosamente',
      nuevoCurso
    });
  } catch (error) {
    console.error('Error al crear el curso:', error);
    res.status(500).json({ message: 'Error al crear el curso' });
  }
};
