const Product = require("../models/product");

//Create
const addProduct = async (name, description, price, category) => {
  try {
    const newProduct = new Product({
      name,
      description,
      price,
      category,
    });
    await newProduct.save();
    return newProduct;
  } catch (error) {
    throw new Error(error);
  }
};
//Read
const getProducts = async (name, description, price, category, sort) => {
  try {
    let filter = {};
    let sorted = { _id: -1 };
    if (category) {
      filter.category = category;
    }
    if (sort === "name") {
      sorted = { name: 1 };
    } else if (sorted === "price") {
      sorted = { price: -1 };
    }
    const products = await Product.find(filter).sort(sorted);
    return products;
  } catch (error) {
    throw new Error(error);
  }
};

//Read - ID
const getProduct = async (product_id) => {
  const product = await Product.findById(product_id);
  return product;
};

//Update
const updateProduct = async (
  product_id,
  name,
  description,
  price,
  category
) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      product_id,
      {
        name,
        description,
        price,
        category,
      },
      {
        new: true,
      }
    );
    return updatedProduct;
  } catch (error) {
    throw new Error(error);
  }
};

//Delete

module.exports = {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
};
