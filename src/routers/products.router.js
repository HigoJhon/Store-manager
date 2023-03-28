const express = require('express');
const productsController = require('../controllers/products.controller');
const { validProductName } = require('../middlewares/productsValid');

const router = express.Router();

router.get('/', productsController.getByAll);
router.get('/:id', productsController.getById);
router.post('/', productsController.postName);
router.put('/:id',
  validProductName,
  productsController.putId);
router.delete('/:id', productsController.deleteId);

module.exports = router;