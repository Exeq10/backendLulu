import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema({
  nombre: String,
  talle: String,
  categoria: String,
  color: String,
  precio: Number,
  estado: {
    type: String,
    enum: ['disponible', 'vendido'],
    default: 'disponible'
  },
  fechaVenta: Date,
  COD: {
    type: String,
    unique: true,
    required: true
  },
}, { timestamps: true });

// Función para generar un COD único
async function generateUniqueCOD(categoria, model) {
  const prefix = categoria.substring(0, 3).toUpperCase();
  let cod;
  let exists = true;
  let attempts = 0;

  while (exists && attempts < 10) {
    const randomNum = Math.floor(100 + Math.random() * 900); // 3 dígitos
    cod = `${prefix}${randomNum}`.substring(0, 6);
    exists = await model.exists({ COD: cod });
    attempts++;
  }

  if (exists) {
    throw new Error('No se pudo generar un COD único después de varios intentos.');
  }

  return cod;
}

// Middleware para generar COD si no existe
productoSchema.pre('validate', async function (next) {
  if (!this.COD && this.categoria) {
    try {
      this.COD = await generateUniqueCOD(this.categoria, mongoose.model('Producto'));
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});


export default mongoose.model('Producto', productoSchema);
