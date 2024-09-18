import jwt from 'jsonwebtoken';
import { TablaAsistencia } from '../models/ModelAsistencia.js';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.SECRET_KEY;
export const registrarAsistencia = async (req, res) => {
    const { qrToken } = req.body;
    try {
        // Decodifica el token JWT
        const decoded = jwt.verify(qrToken, secretKey);

        // Obtener fecha y hora en formato adecuado
        const fechaActual = new Date();
        // 2024-03-24T08:00:00.000Z --- T es el delimitador que separa la fecha de la hora.
        const fecha = fechaActual.toISOString().split('T')[0]; // Formato 'YYYY-MM-DD'
        const hora = fechaActual.toTimeString().split(' ')[0]; // Formato 'HH:MM:SS'

        // Crear una nueva entrada en la tabla de asistencias
        const nuevaAsistencia = await TablaAsistencia.create({
            ProfesorID: decoded.id,
            Fecha: fecha,
            HoraLlegada: hora
        });

        // Responder con éxito
        return res.status(200).json({
            message: 'Asistencia registrada con éxito',
        });
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            // Error si el token es inválido o expirado
            return res.status(403).json({ message: 'Token inválido o expirado' });
        } else {
            // Error general
            console.error('Error al registrar asistencia:', error);
            return res.status(500).json({ message: 'Error al procesar la solicitud' });
        }
    }
};

export const contarAsistenciasEinasistencias = async (req, res) => {
    const { profesorId } = req.params;
    try {
        const totalAsistencias = await TablaAsistencia.count({
            where: { ProfesorID: profesorId }
        });
        const totalInasistencias = await TablaAsistencia.count({
            where: { ProfesorID: profesorId, inasistencias: true }
        });
        return res.status(200).json({
            message: `Totales de asistencias e inasistencias del profesor con ID ${profesorId}`,
            asistencias: totalAsistencias,
            inasistencias: totalInasistencias
        });
    } catch (error) {
        console.error('Error al contar asistencias e inasistencias:', error);
        return res.status(500).json({ message: `Error al procesar la solicitud: ${error.message}` });
    }
};