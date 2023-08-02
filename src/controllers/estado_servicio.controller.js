
const db = require("../models/");

 
const getEstadoServicios = async (req, res) => {
  try {
    


    const estadoServicio = await db.estado_servicio.findAll();
    res.json(estadoServicio);
  } catch (error) {
    return res.status(500).json({ message: error.message });

  }
};

const getEstadoServicio = async (req, res, ) => {
  try {
    const { id } = req.params;
    const estadoServicio = await db.estado_servicio.findOne({
      where: {
        id: id,
      },
    });
    if (!estadoServicio)
      return res
        .status(404)
        .json({ message: `No existe el estado de servicio con id ${id}` });
    res.json(estadoServicio);
  } catch (error) {
    
    return res.status(500).json({ message: error.message }); 
  }
};

const CreateEstadoServicio = async (req, res) => {
  const { nombre } = req.body;

  try {
    const newEstadoServicio = await db.estado_servicio.create({
      nombre,
    });

    res.json(newEstadoServicio);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateEstadoServicio = async (req, res) => {
  try {
    const { id } = req.params;

    const estadoServicio = await db.estado_servicio.findOne({
      where: { id },
    });
    estadoServicio.set(req.body);
    await estadoServicio.save();
    return res.json(estadoServicio);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteEstadoServicio = async (req, res) => {
  try {
    const { id } = req.params;
   await db.estado_servicio.destroy({
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
  getEstadoServicios,
  CreateEstadoServicio,
  getEstadoServicio,
  updateEstadoServicio,
  deleteEstadoServicio,
};
