import TablaCurso from '../models/ModelCursos.js'
  

// Función para listar los cursos en la base de datos
export const ListadoCursos = async (req, res) => {
  try {
    const cursos = await TablaCurso.findAll(); // No necesitas pasar "cursos" como argumento
    res.json(cursos); // Aquí enviamos los cursos en la respuesta
  } catch (error) {
    console.error('Error al obtener cursos:', error); // Cambié el mensaje para reflejar la acción correcta
    res.status(500).send('Error al obtener cursos');
  }
};

  

  