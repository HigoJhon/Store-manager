const connection = require('./connection');

const getAllProducts = async () => {
  const [resul] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return resul;
};

const getProductId = async (id) => {
  const [[resul]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?', [id],
  );
  return resul;
};

module.exports = {
  getAllProducts,
  getProductId,
};