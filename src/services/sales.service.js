const salesModel = require('../models/sales.model');

const getAllSales = async () => {
  const products = await salesModel.getAllSales();
  return { type: null, message: products };
};

const getSalesId = async (req) => {
  const { id } = req.params;
  const products = await salesModel.getSalesId(id);
  const validId = products.length < 1;
  if (!products || validId) return { error: true, type: 404, message: 'Sale not found' };
  return { type: 200, message: products };
};

const postItem = async (req) => {
  const resul = await salesModel.postSales(req);
  return { type: 201, message: { id: resul, itemsSold: [...req] } };
};

module.exports = {
  postItem,
  getAllSales,
  getSalesId,
};