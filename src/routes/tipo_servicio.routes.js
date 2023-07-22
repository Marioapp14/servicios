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

router.get("/servicio", getTipoServicios);
router.get("/servicio/:id", getTipoServicio);
router.post("/servicio/", CreateTipoServicio);
router.put("/servicio/:id", updateTipoServicio);
router.delete("/servicio/:id", deleteTipoServicio);

// export default router;
module.exports = router;