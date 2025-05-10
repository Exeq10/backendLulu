import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productosRoutes from './inventario-api/Routes/productosRoutes.js'
import cors from 'cors';


import { dbconnect } from './inventario-api/db/db.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


dbconnect()

app.use('/api/productos', productosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
