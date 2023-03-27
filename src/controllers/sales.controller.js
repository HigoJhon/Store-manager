const salesService = require('../services/sales.service');

const postSalesItem = async (req, res) => {
  const sale = req.body;
  const { type, message } = await salesService.postItem(sale);
  res.status(type).json(message);
};

module.exports = {
  postSalesItem,
};