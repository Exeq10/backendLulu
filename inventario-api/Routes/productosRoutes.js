import express from 'express';
import {
  crearProducto,
  obtenerProductos,
  editarProducto,
  venderProducto,
  gananciasMensuales,
  productosMasVendidos,
  desmarcarProductoComoVendido,
  eliminarProducto
} from '../Controllers/productosController.js';

const router = express.Router();

router.post('/', crearProducto);
router.get('/', obtenerProductos);
router.put('/:id', editarProducto);
router.put('/vender/:id', venderProducto);
router.put('/desvender/:id', desmarcarProductoComoVendido);
router.get('/reporte/ganancias', gananciasMensuales);
router.get('/reporte/mas-vendidos', productosMasVendidos);

// Nueva ruta para eliminar
router.delete('/:id', eliminarProducto); 
export default router;
