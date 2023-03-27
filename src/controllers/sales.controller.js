const salesService = require('../services/sales.service');

const getByAll = async (req, res) => {
  const { type, message } = await salesService.getAllSales();
  if (type) return res.status(type).json(message);

  res.status(200).json(message);
};

const getById = async (req, res) => {
  const { error, type, message } = await salesService.getSalesId(req);
  if (error) return res.status(type).json({ message });
  res.status(type).json(message);
};

const postSalesItem = async (req, res) => {
  const sale = req.body;
  const { type, message } = await salesService.postItem(sale);
  res.status(type).json(message);
};

module.exports = {
  postSalesItem,
  getByAll,
  getById,
};