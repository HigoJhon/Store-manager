const connection = require('./connection');

const postSales = async (sales) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );
  const resp = sales.map((a) => connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES(?, ?, ?)',
    [insertId, a.productId, a.quantity],
  ));

  await Promise.all(resp);
  return insertId;
};

module.exports = {
  postSales,
};