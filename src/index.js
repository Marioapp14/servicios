// import app from "./app.js";
// import dotenv from "dotenv";
const app = require("./app.js");



// import "./models/tipo_servicio.js";

require("./models/tipo_servicio.js");



async function main() {
  const port = process.env.PORT || 3000;
  try {
   //sequalize.sync({force: false}); //Hace la conexion con la base de datos y crea las tablas
   app.listen(port);
    console.log("Server is listening on port ", port);
  } catch (error) {
    console.log("Unable to connect to the database");
  }
}

main();


