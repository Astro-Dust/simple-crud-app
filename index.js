require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose'); // ajuda a se comunicar com o mongoDB
const Product = require('./models/product.model.js'); // importando o módulo Product
const productRoute = require('./routes/product.route.js');

// middleware
app.use(express.json()); // pra aceitar dados em formato json quando usar o ThunderClient, por exemplo, em Body
app.use(express.urlencoded({extended: false}));

/*
o middleware seria o productRoute. Isso porque productRoute é passado como argumento para o método use() do aplicativo Express, e é o roteador que irá lidar com as solicitações que correspondem ao path "/api/products" e qualquer sub-rota subsequente, como "/api/products/123", "/api/products/create", etc.
*/
app.use('/api/products', productRoute); // aponta para as rotas

// req => request (usuário requisitando algo do servidor)
// res => response (o servidor retorna uma resposta ao usuário)
app.get('/', (req, res) => {
  res.send('Hello from Node API Server');
});

mongoose.connect(`mongodb+srv://admin:${process.env.MONGO_KEY}@backenddb.4g8ty68.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB`)
.then(() => {
  // localhost:3000
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
  console.log('Connected to database!');
})
.catch(() => {
  console.log('Connection failed.');
})