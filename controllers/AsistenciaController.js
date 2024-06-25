import jwt from 'jsonwebtoken';
import { TablaAsistencia } from '../models/ModelAsistencia.js';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.SECRET_KEY;

export const registrarAsistencia = async (req, res) => {
    const { qrToken } = req.body;
    try {
        const decoded = jwt.verify(qrToken, secretKey);

        const fechaActual = new Date();
        const fecha = fechaActual.toISOString().split('T')[0];
        const hora = fechaActual.toTimeString().split(' ')[0];

        const nuevaAsistencia = await TablaAsistencia.create({
            ProfesorID: decoded.id,
            Fecha: fecha,
            HoraLlegada: hora
        });

        return res.status(200).json({
            message: 'Asistencia registrada con éxito',
        });
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(403).json({ message: 'Token inválido o expirado' });
        } else {
            console.error('Error al registrar asistencia:', error);
            return res.status(500).json({ message: 'Error al procesar la solicitud' });
        }
    }
};

export const contarAsistencias = async (req, res) => {
    const { profesorId } = req.params;
    try {
        const totalAsistencias = await TablaAsistencia.count({
            where: { ProfesorID: profesorId }
        });
        return res.status(200).json({
            message: `Total de asistencias del profesor con ID ${profesorId}`,
            totalAsistencias
        });
    } catch (error) {
        console.error('Error al contar asistencias:', error);
        return res.status(500).json({ message: 'Error al procesar la solicitud' });
    }
};

export const contarInasistencias = async (req, res) => {
    const { profesorId } = req.params;
    try {
        const totalInasistencias = await TablaAsistencia.count({
            where: { ProfesorID: profesorId, inasistencias: true }
        });
        return res.status(200).json({
            message: `Total de inasistencias del profesor con ID ${profesorId}`,
            totalInasistencias
        });
    } catch (error) {
        console.error('Error al contar inasistencias:', error);
        return res.status(500).json({ message: 'Error al procesar la solicitud' });
    }
};

