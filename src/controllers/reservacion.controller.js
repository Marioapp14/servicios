const db = require("../models");
const moment = require("moment");

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

// Funcion para obtener toddas las reservaciones con servicio igual a 10
const getReservaciones2 = async (req, res) => {
  try {
    const { limit = 10, offset = 0 } = req.query;

    const reservaciones = await db.reservacion.findAll({
      include: [
        {
          model: db.estado_reservacion,
          attributes: ["nombre"],
        },
        {
          model: db.reservacion_elemento,
          attributes: ["id_elemento"],
        },
        {
          model: db.servicio_reservacion,
          attributes: ["id_servicio"],
          where: {
            id_servicio: 10,
          },
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
    res.json(reservaciones);
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

// Funcion para obtener el id_elemento de la tabla reservacion_elemento
const getIdElemento = async (req, res) => {
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

    // obtener el id_elemento de la tabla
    const id_elemento = await db.reservacion_elemento.findOne({
      where: {
        id_reservacion: id,
      },
    });
    if (!id_elemento)
      return res
        .status(404)
        .json({ message: `No existe el Préstamo con id ${id}` });

    res.json(id_elemento);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Funcion para crear un prestamo
const CreatePrestamo = async (req, res) => {
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

// Funcion para crear la solicitud de una reservacion
const Reservacion = async (req, res) => {
  const {
    id_servicio = 2,
    id_solicitante,
    id_estado_reservacion = 3,
    id_elementos, //Array de los espacios a reservar
    observacion,
    fecha_inicio,
    hora_inicio,
    hora_fin,
    fecha_fin,
  } = req.body;

  try {
    // Verificar si ya existe una reservación para los elementos y la fecha/hora especificados
    const existingReservacion = await Promise.all(
      id_elementos.map(async (id_elemento) => {
        return await db.reservacion_elemento.findOne({
          include: [
            {
              model: db.reservacion,
              where: {
                fecha_inicio: fecha_inicio,
                hora_inicio: {
                  [Op.lt]: hora_fin,
                },
                hora_fin: {
                  [Op.gt]: hora_inicio,
                },
              },
            },
          ],
          where: {
            id_elemento: id_elemento,
          },
        });
      })
    );

    if (existingReservacion.some((reservacion) => reservacion !== null)) {
      return res.status(400).json({
        message:
          "La hora solicitada no está disponible para la fecha especificada.",
      });
    }

    // Realizar la inserción en la tabla principal
    const newReservacion = await db.reservacion.create({
      fecha_inicio: fecha_inicio,
      hora_inicio: hora_inicio,
      hora_fin: hora_fin,
      id_estado_reservacion: id_estado_reservacion,
      id_solicitante: id_solicitante,
      fecha_fin: fecha_fin || null,
      observacion: observacion,
    });

    // Realizar la inserción en la tabla intermedia para cada elemento
    const reservacionElementos = await Promise.all(
      id_elementos.map(async (id_elemento) => {
        return await db.reservacion_elemento.create({
          id_reservacion: newReservacion.id,
          id_elemento,
        });
      })
    );

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

// Funcion para aprobar una reservacion
const AprobarReservacion = async (req, res) => {
  try {
    const { id } = req.params;

    const reservacion = await db.reservacion.findOne({
      where: { id },
    });

    if (!reservacion) {
      return res
        .status(404)
        .json({ message: `No existe la reservación con id ${id}` });
    }
    await db.reservacion.update(
      { id_estado_reservacion: 6 },

      {
        where: { id },
      }
    );
    return res.status(200).json({ message: "Reservación aprobada" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message + "error al acualizar" });
  }
};

// Funcion para obtener las reservaciones en proceso
const getReservasEnProceso = async (req, res) => {
  try {
    const { limit = 10, offset = 0 } = req.query;

    const reservaciones = await db.reservacion.findAll({
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
        id_estado_reservacion: 3,
      },
      limit,
      offset,
    });
    res.status(200).json(reservaciones);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getHorasDisponibles = async (req, res) => {
  try {
    const { id_elemento, fecha } = req.query;

    // Validar los datos de entrada
    if (!id_elemento || !fecha) {
      return res.status(400).json({ message: 'Se requiere id_elemento y fecha.' });
    }

    let horasInicioDisponibles = Array.from({ length: 16 }, (_, i) => i + 6);
    let horasFinDisponibles = Array.from({ length: 16 }, (_, i) => i + 7);

    // Obtener las reservaciones para el elemento en la fecha especificada
    let reservaciones;
    try {
      reservaciones = await db.reservacion.findAll({
        include: [
          {
            model: db.reservacion_elemento,
            where: { id_elemento: id_elemento },
          },
        ],
        where: {
          fecha_inicio: moment(fecha, "DD-MM-YYYY").format("YYYY-MM-DD"), // Convertir la fecha al formato de la base de datos
        },
        order: [["hora_inicio", "ASC"]], // Ordenar las reservaciones por hora de inicio
      });
    } catch (error) {
      return res.status(500).json({ message: 'Error al obtener las reservaciones.' });
    }

    // Para cada reservación, eliminar las horas que están dentro del rango de la reservación de las horas disponibles
    reservaciones.forEach((reservacion) => {
      const horaInicioReservacion = moment(
        reservacion.hora_inicio,
        "HH:mm:ss"
      ).hours();
      const horaFinReservacion = moment(
        reservacion.hora_fin,
        "HH:mm:ss"
      ).hours();
      horasInicioDisponibles = horasInicioDisponibles.filter(hora => hora < horaInicioReservacion || hora >= horaFinReservacion);
      horasFinDisponibles = horasFinDisponibles.filter(hora => hora <= horaInicioReservacion || hora > horaFinReservacion);
    });

    // Asegurarse de que cada hora de fin disponible es al menos una hora después de una hora de inicio disponible
    horasFinDisponibles = horasFinDisponibles.filter(horaFin => horasInicioDisponibles.some(horaInicio => horaInicio < horaFin));

    res.status(200).json({ horasInicioDisponibles, horasFinDisponibles });
  } catch (error) {
    return res.status(500).json({ message: 'Error inesperado.' });
  }
};

// funcion para finalizar un prestamo
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
    return res
      .status(500)
      .json({ message: error.message + "error al acualizar" });
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
  CreatePrestamo,
  updateReservacion,
  deleteReservacion,
  Reservacion,
  getReservaciones2,
  getIdElemento,
  AprobarReservacion,
  getReservasEnProceso,
  getHorasDisponibles,
};
