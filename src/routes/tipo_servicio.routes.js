const { Router } = require("express");
// import {
// getTipoServicios,
// getTipoServicio,
// CreateTipoServicio,
// updateTipoServicio,
// deleteTipoServicio,
// } from "../controllers/tipo_servicio.controller";

const {
    getTipoServicios,
    getTipoServicio,
    CreateTipoServicio,
    updateTipoServicio,
    deleteTipoServicio
  } = require("../controllers/tipo_servicio.controller");
  


const router = Router();

router.get("/servicio/tipo_servicios", getTipoServicios);
router.get("/servicio/tipo_servicios/:id", getTipoServicio);
router.post("/servicio/tipo_servicios", CreateTipoServicio);
router.put("/servicio/tipo_servicios/:id", updateTipoServicio);
router.delete("/servicio/tipo_servicios/:id", deleteTipoServicio);

export default router;