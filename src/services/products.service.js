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
  if (!name) return { error: true, type: 400, message: '"name" is required' }; 
  if (name.length < 5) {
    return {
      errorLength: true, type: 422, message: '"name" length must be at least 5 characters long',
    };
  }
  const [products] = await productsModel.postItem({ name });
  return { type: 201, message: { id: products.insertId, name } };
};

const putProductUpdate = async ({ name, id }) => {
  const pushId = await productsModel.getProductId(id);
  if (pushId === undefined) return { type: 404, message: { message: 'Product not found' } }; 
  
  const resul = await productsModel.putProductUpdate(name, id);
  return { type: 200, message: resul };
};

const deletProduct = async ({ id }) => {
  const pushId = await productsModel.getProductId(id);
  if (pushId === undefined) return { type: 404, message: { message: 'Product not found' } };
  await productsModel.deletProduct(id);
  return { type: 204 };
};

module.exports = {
  getAllProducts,
  getProductId,
  postItem,
  putProductUpdate,
  deletProduct,
};