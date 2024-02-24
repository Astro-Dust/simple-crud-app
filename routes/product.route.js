const express = require('express');
const Product = require('../models/product.model.js');
const router = express.Router();
const {createProduct, getProducts, getProduct, editProduct, deleteProduct} = require('../controllers/product.controller.js');

router.post('/', createProduct);
router.get('/', getProducts);
router.get('/:id', getProduct);
router.put('/:id', editProduct);
router.delete('/:id', deleteProduct);

module.exports = router;