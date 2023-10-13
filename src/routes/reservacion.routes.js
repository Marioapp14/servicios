const { Router } = require("express");

const {
  getReservaciones,
  getPrestamos,
  getPrestamosFinalizados,
  getReservacion,
  CreateReservacion,
  updateReservacion,
  deleteReservacion,
} = require("../controllers/reservacion.controller");

const router = Router();


router.get("/reservacion", getReservaciones);
router.get("/prestamo", getPrestamos);
router.get("/prestamos-finalizados", getPrestamosFinalizados);
router.get("/reservacion/:id", getReservacion);
router.post("/reservacion", CreateReservacion);
router.put("/reservacion/:id", updateReservacion);
router.delete("/reservacion/:id", deleteReservacion);


module.exports = router;
