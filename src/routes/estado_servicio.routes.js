const { Router } = require("express");

const {
    getEstadoServicios,
    getEstadoServicio,
    CreateEstadoServicio,
    updateEstadoServicio,
    deleteEstadoServicio
   
  } = require("../controllers/estado_servicio.controller");
  


const router = Router();

router.get("/estado_servicio", getEstadoServicios);
router.get("/estado_servicio/:id", getEstadoServicio);
router.post("/estado_servicio/", CreateEstadoServicio);
router.put("/estado_servicio/:id", updateEstadoServicio);
router.delete("/estado_servicio/:id", deleteEstadoServicio);


module.exports = router;