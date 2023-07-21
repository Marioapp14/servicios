const express = require("express");




const app = express();


//settings
app.set("port", process.env.PORT || 3000);


//midlewares
app.use(express.json()); //cada vez que se envie un dato en Json el servidor lo va a interpretar y lo guarda dentro de un req.body



//routes


module.exports = app;

