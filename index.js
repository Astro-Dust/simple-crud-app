const express = require('express');
const app = express();
const mongoose = require('mongoose'); // ajuda a se comunicar com o mongoDB
const Product = require('./models/product.model.js'); // importando o módulo Product

app.use(express.json()); // pra aceitar dados em formato json quando usar o ThunderClient, por exemplo, em Body


// req => request (usuário requisitando algo do servidor)
// res => response (o servidor retorna uma resposta ao usuário)
app.get('/', (req, res) => {
  res.send('Hello from Node API Server');
});

app.post('/api/products', async (req, res) => { // usando async-await pq pode demorar um tempo
  try {
    const product = await Product.create(req.body); // criando/salvando um produto no mongoDB
    res.status(200).json(product);
  } catch(error) {
    res.status(500).json({message: error.message}); // mostra mensagem de erro e status 500 (erro interno)
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({}); // para achar todos os produtos
    res.status(200).json(products);
  } catch(error) {
    res.status(500).json({message: error.message});
  }
});

mongoose.connect('mongodb+srv://admin:NRp1qltTcaGRPvba@backenddb.4g8ty68.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB')
.then(() => {
  // localhost:3000
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
  console.log('Connected to database!');
})
.catch(() => {
  console.log('Connection failed.')
})