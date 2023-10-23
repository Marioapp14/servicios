const db = require("../models");

const getReservaciones = async (req, res) => {
  try {
    const reservaciones = await db.reservacion.findAll({
      attributes: ["id", "fecha_inicio", "fecha_fin", "observacion"],
    });
    res.json(reservaciones);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getPrestamos = async (req, res) => {
  try {
    const { limit = 10, offset = 0 } = req.query;

    const prestamos = await db.reservacion.findAll({
      include: [
        {
          model: db.estado_reservacion,
          attributes: ["nombre"],
        },
        {
          model: db.reservacion_elemento,
          attributes: ["id_elemento"],
        },
      ],
      where: {
        id_estado_reservacion: {
          [db.Sequelize.Op.ne]: 4,
        },
      },
      limit,
      offset,
    });
    res.json(prestamos);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//obtener los prestamos finalizados

const getPrestamosFinalizados = async (req, res) => {
  try {
    const { limit = 10, offset = 0 } = req.query;

    const prestamos = await db.reservacion.findAll({
      include: [
        {
          model: db.estado_reservacion,
          attributes: ["nombre"],
        },
        {
          model: db.reservacion_elemento,
          attributes: ["id_elemento"],
        },
      ],
      where: {
        id_estado_reservacion: 4,
      },
      limit,
      offset,
    });

    res.json(prestamos);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getReservacion = async (req, res) => {
  try {
    const { id } = req.params;
    const prestamo = await db.reservacion.findOne({
      where: {
        id: id,
      },
    });
    if (!prestamo)
      return res
        .status(404)
        .json({ message: `No existe el Préstamo con id ${id}` });
    res.json(prestamo);
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
    fecha_fin,
  } = req.body;

  try {
    // Realizar la inserción en la tabla principal
    const newReservacion = await db.reservacion.create({
      fecha_inicio: new Date(),
      id_estado_reservacion: id_estado_reservacion,
      id_solicitante: id_solicitante,
      fecha_fin: fecha_fin || null,
      id_estado_reservacion: id_estado_reservacion,
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

    const reservacion = await db.reservacion.findOne({
      where: { id },
    });

    if (!reservacion) {
      return res
        .status(404)
        .json({ message: `No existe el préstamo con id ${id}` });
    }
    await db.reservacion.update(
      { id_estado_reservacion: 4, fecha_fin: new Date() },

      {
        where: { id },
      }
    );
    return res.status(200).json({ message: "Préstamo finalizado" });
  } catch (error) {
    return res.status(500).json({ message: error.message+ "error al acualizar" });
  }
};

const deleteReservacion = async (req, res) => {
  try {
    const { id } = req.params;
    await db.reservacion.destroy({
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
  getPrestamos,
  getPrestamosFinalizados,
  getReservacion,
  CreateReservacion,
  updateReservacion,
  deleteReservacion,
};
