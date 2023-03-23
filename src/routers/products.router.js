const express = require('express');
const productsController = require('../controllers/products.controller');

const router = express.Router();

router.get('/', productsController.getByAll);
router.get('/:id', productsController.getById);
router.post('/', productsController.postName);

module.exports = router;