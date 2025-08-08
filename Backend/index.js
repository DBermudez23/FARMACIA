import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import { startLoteScheduler } from './config/scheduler.js';
import adminRouter from './routes/adminRoute.js';
import vendedorRouter from './routes/vendedorRoute.js';


const app = express();
const port = process.env.PORT || 4000;

//Conexiones iniciales
connectDB();
connectCloudinary();
startLoteScheduler(); // Cada día se modificara el estado activo automaticamente de los lotes dependiendo de su fecha de vencimiento

//Middlewares
app.use(express.json());
app.use(cors());

//Rutas endpoints
app.use('/api/admin', adminRouter);
app.use('/api/vendedor', vendedorRouter);

app.get('/', (req, res) => {
    res.send('API FUNCIONADNO')
});

app.listen(port, () => {
    console.log("Server started", port)
})