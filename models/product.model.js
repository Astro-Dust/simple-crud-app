const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(
  {

    name: {
      type: String,
      required: [true, 'Please enter product name!'],
    },

    quantity: {
      type: Number,
      required: true,
      default: 0
    },

    price: {
      type: Number,
      required: true,
      default: 0
    },

    image: {
      type: String,
      required: false
    }

  },

  {
    timestamps: true
  }

);

// informando que Product é de fato um model
const Product = mongoose.model("Product", ProductSchema);

// exportando para utilizar em outro lugar
module.exports = Product;