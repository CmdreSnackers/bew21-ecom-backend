const express = require("express");
const router = express.Router();

const Product = require("../models/product");

const { getCategories } = require("../controllers/category");

// router.get("/", async (req, res) => {
//   try {
//     let categories = [];
//     const products = await Product.find();
//     products.forEach((product) => {
//       if (!categories.includes(product.category)) {
//         categories.push(product.category);
//       }
//     });
//     res.status(200).send(categories);
//   } catch (error) {
//     res.status(400).send({
//       message: "Cannot retreive Categories",
//     });
//   }
// });

router.get("/", async (req, res) => {
  try {
    const categories = await getCategories();
    res.status(200).send(categories);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

module.exports = router;
