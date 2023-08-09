const db = require("../models");

const getReservacionElementos = async (req, res) => {
  try {
    
    const reservacionElemento = await db.reservacion_elemento.findAll();
    res.json(reservacionElemento);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getReservacionElemento = async (req, res) => {
  try {
    const { id } = req.params;
    const reservacionElemento = await db.reservacion_elemento.findOne({
      where: {
        id: id,
      },
    });
    if (!reservacionElemento)
      return res
        .status(404)
        .json({ message: `No existe el servicio-elemento con id ${id}` });
    res.json(reservacionElemento);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const CreateReservacionElemento = async (req, res) => {
  const { nombre } = req.body;

  try {
    const newReservacionElemento = await db.reservacion_elemento.create({
      nombre,
    });

    res.json(newReservacionElemento);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateReservacionElemento = async (req, res) => {
  try {
    const { id } = req.params;

    const reservacionElemento = await db.reservacion_elemento.findOne({
      where: { id },
    });
    reservacionElemento.set(req.body);
    await reservacionElemento.save();
    return res.json(reservacionElemento);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteReservacionElemento = async (req, res) => {
  try {
    const { id } = req.params;
    await db.reservacion_elemento.destroy({
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
  getReservacionElementos,
  getReservacionElemento,
  CreateReservacionElemento,
  updateReservacionElemento,
  deleteReservacionElemento,
};
