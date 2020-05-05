const cors = require('cors')
const express = require('express');

const api = express();

api.use(cors());
api.use(express.json());

api.get('/products', (req,res) => {
  return res.json([
    {
      "id": "123",
      "title": "Nome do produto 01",
      "image_url": "https://storage.googleapis.com/golden-wind/bootcamp-gostack/camiseta-ecommerce.jpg",
      "price": 50
    },
    {
      "id": "1234",
      "title": "Nome do produto 02",
      "image_url": "https://storage.googleapis.com/golden-wind/bootcamp-gostack/camiseta-ecommerce.jpg",
      "price": 60
    },
    {
      "id": "12345",
      "title": "Nome do produto 03",
      "image_url": "https://storage.googleapis.com/golden-wind/bootcamp-gostack/camiseta-ecommerce.jpg",
      "price": 70
    },
    {
      "id": "123456",
      "title": "Nome do produto 04",
      "image_url": "https://storage.googleapis.com/golden-wind/bootcamp-gostack/camiseta-ecommerce.jpg",
      "price": 80
    }
  ])
})

api.listen(3334);