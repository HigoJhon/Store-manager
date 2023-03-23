const productsModel = require('../models/products.model');

const getAllProducts = async () => {
  const products = await productsModel.getAllProducts();
  return { type: null, message: products };
};

const getProductId = async (req) => {
  const { id } = req.params;
  const products = await productsModel.getProductId(id);
  if (!products) return { error: true, type: 404, message: 'Product not found' };
  return { type: 200, message: products };
};

const postItem = async (req) => {
  const { name } = req.body;
  const [products] = await productsModel.postItem({ name });
  return { type: 201, message: { id: products.insertId, name } };
};

module.exports = {
  getAllProducts,
  getProductId,
  postItem,
};