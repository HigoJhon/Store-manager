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

const postItem = async (name) => {
  const insertItem = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES(?)', [name],
  );

  return insertItem;
};

const putProductUpdate = async (name, id) => {
  console.log(id, name, 'cheguei na model');
 await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?', [name, id],
  );
  return {
    id,
    name,
  };
};

module.exports = {
  getAllProducts,
  getProductId,
  postItem,
  putProductUpdate,
};