const db = require("../models");

const getServicioReservaciones = async (req, res) => {
  try {
    const servicioReservacion = await db.servicio_reservacion.findAll();
    res.json(servicioReservacion);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getServicioReservacion = async (req, res) => {
  try {
    const { id } = req.params;
    const servicioReservacion = await db.servicio_reservacion.findOne({
      where: {
        id: id,
      },
    });
    if (!servicioReservacion)
      return res
        .status(404)
        .json({ message: `No existe el servicio con id ${id}` });
    res.json(servicioReservacion);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const CreateServicioReservacion = async (req, res) => {
  const { nombre } = req.body;

  try {
    const servicioReservacion = await db.servicio_reservacion.create({
      nombre,
    });

    res.json(servicioReservacion);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateServicioReservacion = async (req, res) => {
  try {
    const { id } = req.params;

    const servicioReservacion = await db.servicio_reservacion.findOne({
      where: { id },
    });
    servicioReservacion.set(req.body);
    await servicioReservacion.save();
    return res.json(servicioReservacion);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteServicioReservacion = async (req, res) => {
  try {
    const { id } = req.params;
    await db.servicio_reservacion.destroy({
      where: {
        id: id,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getServicioReservaciones,
  getServicioReservacion,
  CreateServicioReservacion,
  updateServicioReservacion,
  deleteServicioReservacion,
};
