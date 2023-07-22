const tipo_servicio = require("../models/tipo_servicio");
const db = require("../models/");



const getTipoServicios = async (req, res) => {
  try {
    // const tipoServicios = await tipo_servicio.findAll();
    const tipoServicio = await db.tipo_servicio.findAll();
    res.json(tipoServicio);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getTipoServicio = async (req, res) => {
  try {
    const { id } = req.params;
    const tipoServicios = await db.tipo_servicio.findOne({
      where: {
        id: id,
      },
    });
    if (!tipoServicios)
      return res
        .status(404)
        .json({ message: `No existe el servicio con id ${id}` });
    res.json(tipoServicios);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const CreateTipoServicio = async (req, res) => {
  const { nombre } = req.body;

  try {
    const newTipoServicio = await db.tipo_servicio.create({
      nombre,
    });

    res.json(newTipoServicio);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

 const updateTipoServicio = async (req, res) => {
  try {
    const { id } = req.params;

    const tipoServicio = await db.tipo_servicio.findOne({
      where: { id },
    });
    tipo_servicio.set(req.body);
    await tipo_servicio.save();
    return res.json(tipoServicio);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

 const deleteTipoServicio = async (req, res) => {
  try {
    const { id } = req.params;
    await db.tipo_servicio.destroy({
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
  getTipoServicios,
  getTipoServicio,
  CreateTipoServicio,
  updateTipoServicio,
  deleteTipoServicio,
};
