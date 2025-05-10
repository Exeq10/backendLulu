import Producto from '../Models/Producto.js'

// Crear producto
export const crearProducto = async (req, res) => {
  try {
    const producto = new Producto(req.body);
    await producto.save();
    res.status(201).json(producto);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Leer todos los productos
export const obtenerProductos = async (req, res) => {
  const productos = await Producto.find();
  res.json(productos);
};

// Editar producto
export const editarProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const actualizado = await Producto.findByIdAndUpdate(id, req.body, { new: true });
    res.json(actualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Marcar como vendido
export const venderProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const vendido = await Producto.findByIdAndUpdate(id, { estado: 'vendido', fechaVenta: new Date() }, { new: true });
    res.json(vendido);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Calcular ganancia mensual
export const gananciasMensuales = async (req, res) => {
  const ahora = new Date();
  const inicioMes = new Date(ahora.getFullYear(), ahora.getMonth(), 1);

  const vendidos = await Producto.find({
    estado: 'vendido',
    fechaVenta: { $gte: inicioMes }
  });

  const total = vendidos.reduce((sum, p) => sum + p.precio, 0);
  res.json({ cantidadVendidos: vendidos.length, ganancia: total });
};

// Reporte de más vendidos
export const productosMasVendidos = async (req, res) => {
  const productos = await Producto.aggregate([
    { $match: { estado: 'vendido' } },
    { $group: { _id: "$nombre", cantidad: { $sum: 1 } } },
    { $sort: { cantidad: -1 } },
    { $limit: 10 }
  ]);
  res.json(productos);
};

export const desmarcarProductoComoVendido = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    producto.estado = 'disponible';
    producto.fechaVenta = null;

    await producto.save();

    res.json(producto);
  } catch (error) {
    console.error('Error al desmarcar producto:', error);
    res.status(500).json({ error: 'Error al desmarcar producto como vendido' });
  }
};

// Eliminar producto
export const eliminarProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const eliminado = await Producto.findByIdAndDelete(id);
    if (!eliminado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json({ mensaje: 'Producto eliminado correctamente', producto: eliminado });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};