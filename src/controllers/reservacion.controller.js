const db = require("../models");
const { Op } = require("sequelize");
const moment = require('moment-timezone');

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
        {
          model: db.servicio_reservacion,
          where: { id_servicio: 1 }, // 1 para préstamos
          required: true,
          attributes: [],
        },
      ],
      where: {
        id_estado_reservacion: 8, // Filtrar por id_estado_reservacion igual a 8 que representa "En préstamo"
      },
      limit,
      offset,
    });
    res.status(200).json(prestamos);
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
    const reservacion = await db.reservacion.findOne({
      where: {
        id: id,
      },
    });
    if (!reservacion)
      return res
        .status(404)
        .json({ message: `No existe la reservacion con id ${id}` });

    res.status(200).json(reservacion);
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
const crearPrestamo = async (req, res) => {
  try {
    const {
      id_elemento,
      observacion,
      id_solicitante,
      nombre_funcionario,
    } = req.body;
      

    // Obtener la fecha y hora actuales del sistema en la zona horaria de Colombia
    const fecha_inicio = moment().tz("America/Bogota").format("YYYY-MM-DD");
    const hora_inicio = moment().tz("America/Bogota").format("HH:mm:ss");

    // Validar los datos de entrada
    if (!id_elemento) {
      return res.status(400).json({
        message: "Se requiere un elemento para realizar el préstamo.",
      });
    }

    // Verificar si el elemento ya está Prestado en el rango de tiempo deseado
    const prestamoExistente = await db.reservacion.findOne({
      include: [
        {
          model: db.servicio_reservacion,
          where: { id_servicio: 1 }, // 1 para préstamos
          required: true,
        },
        {
          model: db.reservacion_elemento,
          where: { id_elemento: id_elemento },
          required: true,
        },
      ],
      where: {
        id_estado_reservacion: 8, // 8 para "En préstamo"
      },
    });


    if (prestamoExistente) {
      return res.status(400).json({
        message: "El elemento ya está prestado en el rango de tiempo deseado.",
      });
    }

    // Crear el préstamo
    const newPrestamo = await db.reservacion.create({
      id_elemento,
      fecha_inicio,
      fecha_fin: null, // La fecha de fin se establecerá cuando se finalice el préstamo
      hora_inicio,
      hora_fin: null, // La hora de fin se establecerá cuando se finalice el préstamo
      observacion, // Agregar observación
      id_estado_reservacion: 8, // 1 para estado activo
      id_solicitante: id_solicitante, // Asumiendo que el id del solicitante está en req.user.id
      realizado_por: nombre_funcionario, // Asumiendo que el id del usuario que realiza el préstamo está en req.user.id
    });

    // Asociar el préstamo con el servicio de préstamo
    await db.servicio_reservacion.create({
      id_reservacion: newPrestamo.id,
      id_servicio: 1, // 1 para préstamos
    });

    //Asociar el préstamo con el elemento
    await db.reservacion_elemento.create({
      id_reservacion: newPrestamo.id,
      id_elemento,
    });

    res.status(201).json(newPrestamo);
  } catch (error) {
    return res.status(500).json({ message: "Error inesperado." });
  }
};

// Funcion para crear la solicitud de una reservacion
const Reservacion = async (req, res) => {
  const {
    id_servicio = 2,
    id_solicitante,
    id_estado_reservacion = 3,
    id_elemento, // Un solo espacio a reservar
    observacion,
    fecha_inicio, // En formato DD-MM-YYYY
    hora_inicio,
    hora_fin,
  } = req.body;

  // Validar los datos de entrada
  if (
    !id_solicitante ||
    !id_elemento ||
    !fecha_inicio ||
    !hora_inicio ||
    !hora_fin
  ) {
    return res.status(400).json({
      message:
        "Se requiere id_solicitante, id_elemento, fecha_inicio, hora_inicio y hora_fin.",
    });
  }

  // Validar las horas
  if (hora_inicio >= hora_fin) {
    return res
      .status(400)
      .json({ message: "La hora de Fin debe ser mayor a la hora de Inicio" });
  }

  // Convertir la fecha al formato ISO 8601 para las operaciones de la base de datos y moment.js
  const fecha_inicio_ISO = fecha_inicio.split("-").reverse().join("-");

  try {
    // Verificar si ya existe una reservación para el elemento y la fecha/hora especificados
    const existingReservacion = await db.reservacion.findOne({
      include: [
        {
          model: db.reservacion_elemento,
          where: {
            id_elemento: id_elemento,
          },
        },
      ],
      where: {
        fecha_inicio: moment(fecha_inicio_ISO).format("YYYY-MM-DD"),
        id_estado_reservacion: {
          [Op.ne]: 7, // No igual a 7, es decir, diferente de "Rechazada"
        },
      },
    });
    

    if (existingReservacion) {
      return res.status(400).json({
        message: "El espacio ya está reservado en el rango de tiempo deseado.",
      });
    }

    // Realizar la inserción en la tabla principal
    const newReservacion = await db.reservacion.create({
      fecha_inicio: moment(fecha_inicio_ISO).format("YYYY-MM-DD"), // Convertir la fecha al formato de la base de datos
      hora_inicio: moment()
        .hours(hora_inicio)
        .minutes(0)
        .seconds(0)
        .format("HH:mm:ss"),
      hora_fin: moment()
        .hours(hora_fin)
        .minutes(0)
        .seconds(0)
        .format("HH:mm:ss"),
      id_estado_reservacion: id_estado_reservacion,
      id_solicitante: id_solicitante,
      fecha_fin: null,
      observacion: observacion,
    });

    // Realizar la inserción en la tabla intermedia para el elemento
    const reservacionElemento = await db.reservacion_elemento.create({
      id_reservacion: newReservacion.id,
      id_elemento,
    });

    // Realizar la inserción en la tabla servicio_reservacion
    const newServicioReservacion = await db.servicio_reservacion.create({
      id_reservacion: newReservacion.id,
      id_servicio: id_servicio,
    });

    // Convertir la fecha de vuelta al formato DD-MM-YYYY para la salida
    newReservacion.fecha_inicio = fecha_inicio;

    res.json(newReservacion);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Funcion para obtener todas las reservaciones

const getReservas = async (req, res) => {
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
          attributes: [],
          where: {
            id_servicio: 2,
          },
        },
      ],
      limit,
      offset,
    });
    res.status(200).json(reservaciones);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Funcion para obtener todos los prestamos
const getListaPrestamos = async (req, res) => {
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
        {
          model: db.servicio_reservacion,
          attributes: [],
          where: {
            id_servicio: 1,
          },
        },
      ],
      limit,
      offset,
    });
    res.status(200).json(prestamos);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Funcion para aprobar una reservacion
const AprobarReservacion = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_funcionario } = req.body; // El id del usuario que aprueba la reservación

    const reservacion = await db.reservacion.findOne({
      where: { id },
    });

    if (!reservacion) {
      return res
        .status(404)
        .json({ message: `No existe la reservación con id ${id}` });
    }
    await db.reservacion.update(
      { id_estado_reservacion: 6,
        realizado_por: nombre_funcionario},

      {
        where: { id },
      }
    );
    return res.status(200).json({ message: "Reservación aprobada" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message + "error al acutalizar" });
  }
};

// Funcion para rechazar una reservacion
const RechazarReservacion = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_funcionario } = req.body;  // El id del usuario que rechaza la reservación

    const reservacion = await db.reservacion.findOne({
      where: { id },
    });

    if (!reservacion) {
      return res
        .status(404)
        .json({ message: `No existe la reservación con id ${id}` });
    }
    await db.reservacion.update(
      { id_estado_reservacion: 7,
        realizado_por: nombre_funcionario}, // Asumiendo que el id del usuario que rechaza la reservación está en req.user.id

      {
        where: { id },
      }
    );
    return res.status(200).json({ message: "Reservación rechazada" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message + "error al actualizar" });
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

// Funcion para obtener las horas disponibles para una fecha y un elemento específicos
const getHorasDisponibles = async (req, res) => {
  try {
    const { id_elemento, fecha } = req.query;

    // Validar los datos de entrada
    if (!id_elemento || !fecha) {
      return res
        .status(400)
        .json({ message: "Se requiere id_elemento y fecha." });
    }

    // Obtener las reservaciones para el elemento en la fecha especificada
    let reservaciones;
    try {
      reservaciones = await db.reservacion.findAll({
        attributes: ["hora_inicio", "hora_fin"], // Seleccionar solo las horas de inicio y fin
        include: [
          {
            model: db.estado_reservacion,
            where: { id: [1, 6] }, // Filtrar por los ID de los estados "Activa" o "Aceptada"
          },
        ],
        include: [
          {
            model: db.reservacion_elemento,
            where: { id_elemento: id_elemento },
          },
        ],
        where: {
          fecha_inicio: fecha, // No es necesario formatear la fecha aquí si ya está en el formato correcto en la base de datos
          id_estado_reservacion: {
            [Op.in]: [1, 6],
          },
        },
        order: [["hora_inicio", "ASC"]], // Ordenar las reservaciones por hora de inicio
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error al obtener las reservaciones." });
    }

    // Crear un conjunto de horas reservadas
    const horasReservadas = new Set();
    const horasInicioReservadas = new Set();
    const horasFinReservadas = new Set();

    reservaciones.forEach((reservacion) => {
      const horaInicio = moment(reservacion.hora_inicio, "HH:mm:ss").hours();
      const horaFin = moment(reservacion.hora_fin, "HH:mm:ss").hours();

      for (let i = horaInicio; i < horaFin; i++) {
        horasReservadas.add(i);
      }

      horasInicioReservadas.add(horaInicio);
      horasFinReservadas.add(horaFin);
    });

    // Crear una lista de todas las horas posibles
    let horasInicioDisponibles = Array.from({ length: 16 }, (_, i) => i + 6);
    let horasFinDisponibles = Array.from({ length: 16 }, (_, i) => i + 7);

    // Eliminar las horas reservadas de las listas de horas disponibles
    horasInicioDisponibles = horasInicioDisponibles.filter(
      (hora) => !horasReservadas.has(hora)
    );
    horasFinDisponibles = horasFinDisponibles.filter((horaFin) => {
      return (
        !horasReservadas.has(horaFin) &&
        !horasInicioReservadas.has(horaFin) &&
        !horasFinReservadas.has(horaFin)
      );
    });

    res.status(200).json({ horasInicioDisponibles, horasFinDisponibles });
  } catch (error) {
    return res.status(500).json({ message: "Error inesperado." });
  }
};

// funcion para finalizar un prestamo
const finalizarPrestamo = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_funcionario } = req.body; // Extraer nombre_funcionario de req.body

    const reservacion = await db.reservacion.findOne({
      where: { id },
    });

    if (!reservacion) {
      return res
        .status(404)
        .json({ message: `No existe el préstamo con id ${id}` });
    }

    // Obtener la fecha y hora actuales del sistema en la zona horaria de Colombia
    const fecha_fin = moment().tz("America/Bogota").format("YYYY-MM-DD");
    const hora_fin = moment().tz("America/Bogota").format("HH:mm:ss");

    await db.reservacion.update(
      { 
        id_estado_reservacion: 9, 
        fecha_fin, 
        hora_fin, // Actualizar fecha_fin y hora_fin
        finalizado_por: nombre_funcionario // Actualizar finalizado_por
      }, 
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
};
