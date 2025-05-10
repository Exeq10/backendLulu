import env from "dotenv";
import mongoose from "mongoose";



env.config();
const dbconnect = async () => {
  try {
    const URI = process.env.MONGODB_URI || "mongodb+srv://exelu1495:NoKcMsyyNHmgIZwv@cluster0.ue72dr1.mongodb.net/inventario"
    await mongoose.connect(URI);

    console.log("Conexión a MongoDB establecida correctamente");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
  }
};

export {dbconnect};
