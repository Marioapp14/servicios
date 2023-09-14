const { Router } = require("express");

const {
  getReservaciones,
  getReservacion,
  CreateReservacion,
  updateReservacion,
  deleteReservacion,
} = require("../controllers/reservacion.controller");

const router = Router();

router.get("/reservacion", getReservaciones);
router.get("/reservacion/:id", getReservacion);
router.post("/reservacion", CreateReservacion);
router.put("/reservacion/:id", updateReservacion);
router.delete("/reservacion/:id", deleteReservacion);


module.exports = router;
