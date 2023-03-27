const productsModel = require('../models/products.model');

const validProductId = async (req, res, next) => {
  const id = req.body;
  const retu = id.filter((a) => a.productId === undefined);
  if (retu.length >= 1) {
    return res.status(400).json({
      message: '"productId" is required',
    });
  }
  return next();
};

const validQuantity = (req, res, next) => {
  const quantity = req.body;
  const retu = quantity.filter((a) => a.quantity === undefined);
  if (retu.length >= 1) {
    return res.status(400).json({
      message: '"quantity" is required',
    });
  }
  return next();
};

const validQuantityValue = (req, res, next) => {
  const quantity = req.body;
  const retu = quantity.filter((a) => a.quantity < 1);
  if (retu.length >= 1) {
    return res.status(422).json({
      message: '"quantity" must be greater than or equal to 1',
    });
  }
  return next();
};

const validProductExist = async (req, res, next) => {
  const data = await productsModel.getAllProducts();
  const products = req.body;
  const getId = products.map((a) => data
    .some((pro) => +a.productId === +pro.id));

  console.log(getId);
  const resul = getId.filter((a) => !a);

  if (resul.length >= 1) {
    return res.status(404).json({
      message: 'Product not found',
    });
  }
  return next();
};

module.exports = {
  validProductId,
  validQuantity,
  validQuantityValue,
  validProductExist,
};