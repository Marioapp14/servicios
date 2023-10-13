const db = require("../models");
const Op = require('sequelize');

const getServicios = async (req, res) => {
  try {
    // obtiene los parametros de la url para la paginacion de los servicios
    const { limit, offset, tipo_servicio } = req.query;

    // consulta a la base de datos para obtener todos los servicios con sus respectivos tipos y estados
    const options = {
      include: [
        {
          model: db.tipo_servicio,
          attributes: ["nombre"],
          where: {},
        },
        {
          model: db.estado_servicio,
          attributes: ["nombre"],
          where: {
            id: {
              [Op.ne]: 4,
            }
          }
        },
      ],
    };

    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    if (tipo_servicio) {
      options.where = {
        id_tipo: tipo_servicio,
      };
    }

    const Servicio = await db.servicio.findAll();

    res.json(Servicio);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getServicio = async (req, res) => {
  try {
    const { id } = req.params;
    const Servicio = await db.servicio.findOne({
      where: {
        id: id,
      },
    });
    if (!Servicio)
      return res
        .status(404)
        .json({ message: `No existe el servicio con id ${id}` });
    res.json(Servicio);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const CreateServicio = async (req, res) => {
  const { id_solicitante, descripcion, id_tipo, id_estado_servicio } = req.body;

  try {
    const newServicio = await db.servicio.create({
      id_solicitante,
      descripcion,
      id_tipo,
      id_estado_servicio,
    });

    res.json(newServicio);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateServicio = async (req, res) => {
  try {
    const { id } = req.params;

    const Servicio = await db.servicio.findOne({
      where: { id },
    });
    Servicio.set(req.body);
    await Servicio.save();
    return res.json(Servicio);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteServicio = async (req, res) => {
  try {
    const { id } = req.params;
    await db.servicio.destroy({
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
  getServicios,
  getServicio,
  CreateServicio,
  updateServicio,
  deleteServicio,
};
