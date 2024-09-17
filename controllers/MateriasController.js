// Importa el modelo
import TablaMateria from '../models/ModelMateria.js';

// Función para insertar una nueva materia
export const insertarMateria = async (req, res) => {
    const { NombreMateria } = req.body;  // Extraer NombreMateria del cuerpo de la petición
    try {
      // Inserta la nueva materia
      const nuevaMateria = await TablaMateria.create({
        NombreMateria: NombreMateria  // Usar NombreMateria correctamente
      });
  
      console.log('Materia insertada exitosamente:', nuevaMateria);
      res.status(201).json({ message: 'Materia insertada exitosamente', nuevaMateria });
    } catch (error) {
      console.error('Error al insertar la materia:', error);
      res.status(500).json({ error: 'Error al insertar la materia' });
    }
  };

export const ListadoMaterias = async (req, res) => {
    try {
      const materias = await TablaMateria.findAll();
      res.json(materias);
    } catch (error) {
      
    }
}


