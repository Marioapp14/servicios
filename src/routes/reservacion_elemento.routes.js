const { Router } = require("express");

const {
  getReservacionElementos,
  getReservacionElemento,
  CreateReservacionElemento,
  updateReservacionElemento,
  deleteReservacionElemento,
} = require("../controllers/reservacion_elemento.controller");

const router = Router();

router.get("/reservacion_elemento", getReservacionElementos);
router.get("/reservacion_elemento/:id", getReservacionElemento);
router.post("/reservacion_elemento/", CreateReservacionElemento);
router.put("/reservacion_elemento/:id", updateReservacionElemento);
router.delete("/reservacion_elemento/:id", deleteReservacionElemento);


module.exports = router;
