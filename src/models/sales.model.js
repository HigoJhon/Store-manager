const connection = require('./connection');

const getAllSales = async () => {
  const [resul] = await connection.execute(
    `SELECT (sp.sale_id) AS saleId,
    (sa.date) AS date,
    (sp.product_id) AS productId,
    (sp.quantity) AS quantity
     FROM StoreManager.sales_products AS sp
     JOIN StoreManager.sales AS sa ON sa.id = sp.sale_id
     ORDER BY sp.sale_id,
     sp.product_id`,
  );

  return resul;
};

const getSalesId = async (id) => {
  const [resul] = await connection.execute(
    `SELECT (sa.date) AS date,
    (sp.product_id) AS productId,
    (sp.quantity) AS quantity
     FROM StoreManager.sales_products AS sp
     JOIN StoreManager.sales AS sa ON sa.id = sp.sale_id
     WHERE sp.sale_id = ?`, [id],
  );

  return resul;
};

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
  getAllSales,
  getSalesId,
};