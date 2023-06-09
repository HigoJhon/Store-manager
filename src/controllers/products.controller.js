const productsService = require('../services/products.service');
const errorMap = require('../utils/errorMap');

const getByAll = async (req, res) => {
  const { type, message } = await productsService.getAllProducts();
  if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(200).json(message);
};

const getById = async (req, res) => {
  const { error, type, message } = await productsService.getProductId(req);
  if (error) return res.status(type).json({ message });
  res.status(type).json(message);
};

const postName = async (req, res) => {
  const { error, errorLength, type, message } = await productsService.postItem(req);
  if (error) return res.status(type).json({ message });
  if (errorLength) return res.status(type).json({ message });
  res.status(type).json(message);
};

const putId = async (req, res) => {
  const { type, message } = await productsService.putProductUpdate(req);
  res.status(type).json(message);
};

const deleteId = async (req, res) => {
  const { type, message } = await productsService.deletProduct(req);
  res.status(type).json(message);
};

module.exports = {
  getByAll,
  getById,
  postName,
  putId,
  deleteId,
};