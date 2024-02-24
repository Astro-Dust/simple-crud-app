const Product = require('../models/product.model.js');

const createProduct = async (req, res) => {
  // SALVANDO/CRIANDO UM PRODUTO
  try {
    const product = await Product.create(req.body); // criando/salvando um produto no mongoDB
    res.status(200).json(product);
  } catch(error) {
    res.status(500).json({message: error.message}); // mostra mensagem de erro e status 500 (erro interno)
  }
}

const getProducts = async (req, res) => {
  // MOSTRAR TODOS OS PRODUTOS
  try {
    const products = await Product.find({}); // para achar todos os produtos
    res.status(200).json(products);
  } catch(error) {
    res.status(500).json({message: error.message});
  }
}

const getProduct = async (req, res) => {
  // MOSTRAR O PRODUTO BASEADO NO ID
  try {
    const {id} = req.params; // pegando o id passado na url
    const product = await Product.findById(id); // procurando o produto baseado no id
    res.status(200).json(product); // mostrando o produto
  } catch (error) {
      res.status(500).json({message: error.message});
  }
}

const editProduct = async (req, res) => {
  // MODIFICANDO UM PRODUTO
/*
  No ThunderClient, vc coloca seleciona PUT,
  insere o link http://localhost:3000/api/product/65d80a818a287ca9ecff6321
  vai no Body -> JSON e digita algo para mudar, por exemplo:

  {
    "name": "UPDATED Pizza"
    "price": 7.99
  }
*/
  try {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);

    if (!product) {
      return res.status(400).json({message:'Product not found!'});
    }

    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);

  } catch(error) {
      res.status(500).json({message: error.message});
  }
}

const deleteProduct = async (req, res) => {
  // DELETANDO BASEADO NO ID
/*
  Seleciona DELETE,
  insere o link com o id: http://localhost:3000/api/product/65d80a818a287ca9ecff6321
  depois pra testar seleciona GET
  e insere o link http://localhost:3000/api/products
*/
  try {
      const {id} = req.params;
      const product = await Product.findByIdAndDelete(id);

      if (!product) {
        return res.status(400).json({message:'Product not found'});
      }

      res.status(200).json({message:'Product deleted successfully'});

  } catch (error) {
      res.status(500).json({message: error.message});
  }
}

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  editProduct,
  deleteProduct
}