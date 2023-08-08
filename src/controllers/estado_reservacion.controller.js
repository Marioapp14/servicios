const db = require("../models");

const getEstadoReservaciones = async (req, res) => {
  try {
    const estadoReservacion = await db.estado_reservacion.findAll();
    res.json(estadoReservacion);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getEstadoReservacion = async (req, res) => {
  try {
    const { id } = req.params;
    const estadoReservacion = await db.estado_reservacion.findOne({
      where: {
        id: id,
      },
    });
    if (!estadoReservacion)
      return res
        .status(404)
        .json({ message: `No existe el estado de reservacion con id ${id}` });
    res.json(estadoReservacion);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const CreateEstadoReservacion = async (req, res) => {
  const { nombre } = req.body;

  console.log(req.body);

  try {
    const newEstadoReservacion = await db.estado_reservacion.create({
      nombre,
    });

    res.json(newEstadoReservacion);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateEstadoReservacion = async (req, res) => {
  try {
    const { id } = req.params;

    const estadoSReservacion = await db.estado_reservacion.findOne({
      where: { id },
    });
    estadoSReservacion.set(req.body);
    await estadoSReservacion.save();
    return res.json(estadoSReservacion);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteEstadoReservacion = async (req, res) => {
  try {
    const { id } = req.params;

    await db.estado_reservacion.destroy({
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
  getEstadoReservaciones,
  getEstadoReservacion,
  CreateEstadoReservacion,
  updateEstadoReservacion,
  deleteEstadoReservacion,
};
