const { Router } = require("express");

const {
  getReservaciones,
  getPrestamos,
  getPrestamosFinalizados,
  getReservacion,
  CreateReservacion,
  updateReservacion,
  deleteReservacion,
  CreateReservacion2,
  getReservaciones2,
  getIdElemento,
} = require("../controllers/reservacion.controller");

const router = Router();

router.get("/reservacion", getReservaciones);
router.get("/reservaciones-activa", getReservaciones2);
router.get("/prestamo-elemento/:id", getIdElemento);
router.get("/prestamo", getPrestamos);
router.get("/prestamos-finalizados", getPrestamosFinalizados);
router.get("/reservacion/:id", getReservacion);
router.post("/reservacion", CreateReservacion);
router.post("/crear-reservacion", CreateReservacion2);

router.put("/reservacion/:id", updateReservacion);

router.delete("/reservacion/:id", deleteReservacion);

module.exports = router;
