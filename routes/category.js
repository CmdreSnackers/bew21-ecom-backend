const express = require("express");
const router = express.Router();

const Product = require("../models/product");

router.get("/", async (req, res) => {
  try {
    let categories = [];
    const products = await Product.find();
    products.forEach((product) => {
      if (!categories.includes(product.category)) {
        categories.push(product.category);
      }
    });
    res.status(200).send(categories);
  } catch (error) {
    res.status(400).send({
      message: "Cannot retreive Categories",
    });
  }
});

module.exports = router;
