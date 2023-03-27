const express = require('express');
const salesController = require('../controllers/sales.controller');
const { validProductId, validQuantity,
  validQuantityValue, validProductExist } = require('../middlewares/salesValidator');

const router = express.Router();

router.post('/', validProductId, validQuantity, validQuantityValue,
  validProductExist, salesController.postSalesItem);

module.exports = router;