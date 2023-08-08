const { Router } = require("express");


const {
    getTipoServicios,
    getTipoServicio,
    CreateTipoServicio,
    updateTipoServicio,
    deleteTipoServicio
  } = require("../controllers/tipo_servicio.controller");
  


const router = Router();

router.get("/tipo_servicio", getTipoServicios);
router.get("/tipo_servicio/:id", getTipoServicio);
router.post("/tipo_servicio/", CreateTipoServicio);
router.put("/tipo_servicio/:id", updateTipoServicio);
router.delete("/tipo_servicio/:id", deleteTipoServicio);

// export default router;
module.exports = router;