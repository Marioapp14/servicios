const db = require("../models");

const getReservaciones = async (req, res) => {
  try {
    const servicio = await db.reservaciones.findAll({
      include: [
        {
          model: db.estados_reservaciones,
          as: "estado_reservacion",
          attributes: ["nombre"],
        },
      ],
    });
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
  const {
    id_servicio = 1,
    id_solicitante,
    id_estado_reservacion = 1,
    id_elemento,
    observacion,
  } = req.body;

  try {
    // Realizar la inserción en la tabla principal
    const newReservacion = await db.reservaciones.create({
      fecha_inicio: new Date(),
      id_estado_reservacion: id_estado_reservacion,
      id_solicitante: id_solicitante,
      fecha_fin: null,
      id_estado_reservacion,
      observacion: observacion || null,
    });

    // Realizar la inserción en la tabla intermedia
    const newreservacion_elemento = await db.reservacion_elemento.create({
      id_reservacion: newReservacion.id,
      id_elemento,
    });

    // Realizar la inserción en la tabla servicio_reservacion
    const newServicioReservacion = await db.servicio_reservacion.create({
      id_reservacion: newReservacion.id,
      id_servicio: id_servicio,
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

    if (!reservacion) {
      return res
        .status(404)
        .json({ message: `No existe el servicio con id ${id}` });
    }
    await db.reservaciones.update(
      { id_estado_reservacion: 4 },
      {
        where: { id },
      }
    );

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
