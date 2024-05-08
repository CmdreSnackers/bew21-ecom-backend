// const express = require("express");

// const {
//   addProduct,
//   getProduct,
//   getProducts,
//   updateProduct,
// } = require("../controllers/product");
// const Product = require("../models/product");

// const router = express.Router();

//Read
// router.get("/", async (req, res) => {
//   try {
//     const name = req.query.name;
//     const description = req.query.description;
//     const price = req.query.price;
//     const category = req.query.category;
//     const products = await getProducts(name, description, price, category);
//     res.status(200).send(products);
//   } catch (error) {
//     res.status(400).send({
//       message: "Cannot Retreve Products",
//     });
//   }
// });

// //Read - Id
// router.get("/:id", async (req, res) => {
//   try {
//     const product = await getProduct(req.params.id);
//     res.status(200).send(product);
//   } catch (error) {
//     res.status(400).send({
//       message: "Product not found",
//     });
//   }
// });

// //Create
// router.post("/", async (req, res) => {
//   const { name, description, price, category } = req.body;
//   try {
//     const newProduct = await addProduct(name, description, price, category);
//     res.status(200).send(newProduct);
//   } catch (error) {
//     res.status(400).send({
//       message: "Cannot create Product",
//     });
//   }
// });

// //Update
// router.put("/:id", async (req, res) => {
//   const { name, description, price, category } = req.body;
//   const product_id = req.params.id;
//   try {
//     const updatedProduct = await updateProduct(
//       product_id,
//       name,
//       description,
//       price,
//       category
//     );
//     res.status(200).send(updatedProduct);
//   } catch (error) {
//     res.status(400).send({
//       message: "Cannot Update Product",
//     });
//   }
// });

// router.delete("/:id", async (req, res) => {
//   try {
//     const product_id = req.params.id;
//     await Product.findByIdAndDelete(product_id);
//     res.status(200).send("Deleted Product");
//   } catch (error) {
//     res.status(400).send({
//       message: "Product not Found",
//     });
//   }
// });

// module.exports = router;

const express = require("express");
const {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

// set up product router
const router = express.Router();

// get products
router.get("/", async (req, res) => {
  try {
    res
      .status(200)
      .send(
        await getProducts(req.query.category, req.query.perPage, req.query.page)
      );
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// get one product
router.get("/:id", async (req, res) => {
  try {
    res.status(200).send(await getProduct(req.params.id));
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Create
router.post("/", async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const newProduct = await addProduct(name, description, price, category);
    res.status(200).send(newProduct);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Update
router.put("/:id", async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const updatedProduct = await updateProduct(
      req.params.id,
      name,
      description,
      price,
      category
    );
    res.status(200).send(updatedProduct);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteProduct(id);
    res.status(200).send({ message: `Product #${id} has been deleted.` });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// export
module.exports = router;
