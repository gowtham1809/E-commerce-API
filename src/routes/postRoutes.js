const {
  getProducts,
  create,
  getProduct,
  upDateProduct,
  deleteProduct,
} = require("../controllers/postController");

const express = require('express');
const router = express.Router();
router.post('/', create);
router.get('/', getProducts);
router.get('/:id', getProduct);
router.put('/:id', upDateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;