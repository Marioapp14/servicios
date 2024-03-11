const { Router } = require("express");

const {
  getReservaciones,
  getPrestamos,
  getPrestamosFinalizados,
  getReservacion,
  crearPrestamo,
  finalizarPrestamo,
  deleteReservacion,
  Reservacion,
  getReservaciones2,
  getIdElemento,
  AprobarReservacion,
  getReservasEnProceso,
  getHorasDisponibles,
  RechazarReservacion,
  getReservas,
  getListaPrestamos,
} = require("../controllers/reservacion.controller");

const router = Router();

router.get("/reservacion", getReservaciones);
router.get("/reservaciones-activa", getReservaciones2);
router.get("/prestamo-elemento/:id", getIdElemento);
router.get("/prestamos", getPrestamos);
router.get("/prestamos-finalizados", getPrestamosFinalizados);
router.get("/reservacion/:id", getReservacion);

router.get("/reservacion-en-proceso", getReservasEnProceso);
router.get("/listado-reservaciones", getReservas);
router.get("/horas-disponibles", getHorasDisponibles);
router.get("/lista-prestamos", getListaPrestamos);

//ruta para crear un prestamo
router.post("/crear-prestamo", crearPrestamo);
//ruta para crear una reservacion
router.post("/crear-reservacion", Reservacion);

router.put("/reservacion/aprobar/:id", AprobarReservacion);

router.put("/reservacion/rechazar/:id", RechazarReservacion);

router.put("/prestamo/finalizar/:id", finalizarPrestamo);

router.delete("/reservacion/:id", deleteReservacion);

module.exports = router;
