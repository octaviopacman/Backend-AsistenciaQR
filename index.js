import express from 'express';
import cors from 'cors';
import db from "./database/db.js";//base de datos
import Routes from './routes/routes.js'//enrutador
import { registrarAsistencia, contarAsistenciasEinasistencias} from './controllers/AsistenciaController.js';
import login from './controllers/LoginController.js';


const app = express();

const corsOptions = {
    origin: 'https://proyecto-asistencia-qr.vercel.app/',
    credentials: true // Esto permitirá las credenciales (cookies, etc.)
  };


app.use(express.urlencoded({ extended: true }));

app.use(cors(corsOptions));

app.use(express.json());
app.use('/api', Routes);

try {
    db.authenticate();
    console.log('Conexion exitosa a la Base De Datos');
    console.log(`Listo para recibir Solicitudes`);
} catch (error) {
    console.log(`El error de conexion es: ${error}`);
}

app.get("/", (req, res) => {
    res.send(`App is working fine`);
  });

app.listen(8000, () => {
    console.log(' Server UP running in http://localhost:8000/');
});
