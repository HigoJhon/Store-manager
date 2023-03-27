const salesModel = require('../models/sales.model');

const postItem = async (req) => {
  const resul = await salesModel.postSales(req);
  return { type: 201, message: { id: resul, itemsSold: [...req] } };
};

module.exports = {
  postItem,
};