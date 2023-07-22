const express = require("express");

const tipo_servicioRoutes = require("./routes/tipo_servicio.routes");




const app = express();


//settings
app.set("port", process.env.PORT || 3000);


//midlewares
app.use(express.json()); //cada vez que se envie un dato en Json el servidor lo va a interpretar y lo guarda dentro de un req.body



//routes
app.use(tipo_servicioRoutes);


module.exports = app;

