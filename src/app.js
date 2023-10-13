const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const tipo_servicioRoutes = require("./routes/tipo_servicio.routes");
const estado_servicioRoutes = require("./routes/estado_servicio.routes");
const estado_reservacionRoutes = require("./routes/estado_reservacion.routes");
const servicioRoutes = require("./routes/servicio.routes");
const reservacion_elementoRoutes = require("./routes/reservacion_elemento.routes");
const reservacionRoutes = require("./routes/reservacion.routes");
const servicio_reservacionRoutes = require("./routes/servicio_reservacion.routes");

// Cargar las variables de entorno desde el archivo .env
dotenv.config();
const app = express();

//midlewares
app.use(express.json()); //cada vez que se envie un dato en Json el servidor lo va a interpretar y lo guarda dentro de un req.body

// settings
app.use(cors());

//routes
app.use("/servicios", tipo_servicioRoutes);
app.use("/servicios", estado_servicioRoutes);
app.use(estado_reservacionRoutes);
app.use(servicioRoutes);
app.use(reservacion_elementoRoutes);
app.use(reservacionRoutes);
app.use(servicio_reservacionRoutes);

module.exports = app;
