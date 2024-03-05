const { Router } = require("express");

const {
  getReservaciones,
  getPrestamos,
  getPrestamosFinalizados,
  getReservacion,
  CreatePrestamo,
  updateReservacion,
  deleteReservacion,
  Reservacion,
  getReservaciones2,
  getIdElemento,
  AprobarReservacion,
  getReservasEnProceso,
  getHorasDisponibles,
} = require("../controllers/reservacion.controller");

const router = Router();

router.get("/reservacion", getReservaciones);
router.get("/reservaciones-activa", getReservaciones2);
router.get("/prestamo-elemento/:id", getIdElemento);
router.get("/prestamo", getPrestamos);
router.get("/prestamos-finalizados", getPrestamosFinalizados);
router.get("/reservacion/:id", getReservacion);

router.get("/reservacion-en-proceso", getReservasEnProceso);
router.get("/horas-disponibles", getHorasDisponibles);

//ruta para crear un prestamo
router.post("/reservacion", CreatePrestamo);
//ruta para crear una reservacion
router.post("/crear-reservacion", Reservacion);

router.put("/reservacion/aprobar/:id", AprobarReservacion);


router.put("/reservacion/:id", updateReservacion);

router.delete("/reservacion/:id", deleteReservacion);

module.exports = router;
