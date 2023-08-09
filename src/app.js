const express = require("express");
const cors = require("cors");

const tipo_servicioRoutes = require("./routes/tipo_servicio.routes");
const estado_servicioRoutes = require("./routes/estado_servicio.routes");
const estado_reservacionRoutes = require("./routes/estado_reservacion.routes");
const servicioRoutes = require("./routes/servicio.routes");
const reservacion_elementoRoutes = require("./routes/reservacion_elemento.routes");
const reservacionRoutes = require("./routes/reservacion.routes");
const servicio_reservacionRoutes = require("./routes/servicio_reservacion.routes");

const {
  logErrors,
  errorHandler,
  ormErrorHandler,
} = require("./middlewares/error.handler");

const app = express();

//settings
app.set("port", process.env.PORT || 3000);

//midlewares
app.use(express.json()); //cada vez que se envie un dato en Json el servidor lo va a interpretar y lo guarda dentro de un req.body
// app.use(logErrors);
// app.use(errorHandler);

//app.use(ormErrorHandler);

const whtheList = [
  "http://localhost:4200",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
];

const corsOptions = {
  origin: (origin, callback) => {
    const existe = whtheList.some((dominio) => dominio === origin);
    if (existe) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors());

//routes
app.use("/servicios", tipo_servicioRoutes);
app.use("/servicios", estado_servicioRoutes);
app.use("/servicios", estado_reservacionRoutes);
app.use(servicioRoutes);
app.use("/servicios", reservacion_elementoRoutes);
app.use("/servicios", reservacionRoutes);
app.use("/servicios", servicio_reservacionRoutes);

module.exports = app;
