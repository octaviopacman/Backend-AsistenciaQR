import { TablaProfesor } from '../models/ModelProfesor.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secretKey = process.env.SECRET_KEY;  

const login = async (req, res) => {
  const { correo, password } = req.body;
  try {
    const profesor = await TablaProfesor.findOne({ where: { correo } });

    if (profesor) {
      // Comparar la contraseña ingresada con la contraseña hasheada almacenada
      const isMatch = await bcrypt.compare(password, profesor.password);
      if (isMatch) {
        // Autenticación exitosa, generar el token JWT
        const token = jwt.sign({ id: profesor.id }, secretKey, { expiresIn: '10m' });
        return res.status(200).json({
          message: `Bienvenido ${profesor.nombre}`,
          token
        });
      } else {
        return res.status(401).json({ message: 'Credenciales inválidas o usuario inexistente' });
      }
    } else {
      return res.status(404).json({ message: 'Credenciales inválidas o usuario inexistente' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export default login;
