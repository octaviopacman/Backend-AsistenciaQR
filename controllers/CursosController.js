import TablaCurso from '../models/ModelCursos.js'
  
  // Función para insertar los cursos en la base de datos
  export const ListadoCursos = async (req, res) =>{
    try {
      await TablaCurso.findAll(cursos);
      res.json(cursos);
    } catch (error) {
      console.error('Error al insertar cursos:', error);
    }
  }
  

  