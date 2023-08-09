const db = require("../models");

const getReservaciones = async (req, res) => {
  try {
    const servicio = await db.reservaciones.findAll({});
    res.json(servicio);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getReservacion = async (req, res) => {
  try {
    const { id } = req.params;
    const servicio = await db.reservaciones.findOne({
      where: {
        id: id,
      },
    });
    if (!servicio)
      return res
        .status(404)
        .json({ message: `No existe el servicio con id ${id}` });
    res.json(servicio);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const CreateReservacion = async (req, res) => {
  const { fecha_inicio, fecha_fin, id_estado_reservacion } = req.body;

  try {
    const newReservacion = await db.reservaciones.create({
      fecha_inicio,
      fechafin: fecha_fin || null,
      id_estado_reservacion,
    });

    res.json(newReservacion);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateReservacion = async (req, res) => {
  try {
    const { id } = req.params;

    const reservacion = await db.reservaciones.findOne({
      where: { id },
    });
    reservacion.set(req.body);
    await reservacion.save();
    return res.json(reservacion);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteReservacion = async (req, res) => {
  try {
    const { id } = req.params;
    await db.reservaciones.destroy({
      where: {
        id: id,
      },
    });
    res.sendStatus(204);
    res.json({ message: `El servicio con id ${id} fue eliminado` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getReservaciones,
  getReservacion,
  CreateReservacion,
  updateReservacion,
  deleteReservacion,
};
