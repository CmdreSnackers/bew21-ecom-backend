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
const getProducts = async (category, perPage = 4, page = 1) => {
  try {
    let filter = {};
    let sorted = { _id: -1 };
    if (category) {
      filter.category = category;
    }
    // if (sort === "name") {
    //   sorted = { name: 1 };
    // } else if (sorted === "price") {
    //   sorted = { price: -1 };
    // }
    /* 
      sorting > 1 is asc, -1 is desc
      default sorting is sort by _id > { _id: 1 }
      */
    /* 
      Pagination
      .limit() // limit the amount of items returned
      .skip() // skip given amount
    */
    // const perPage = 4;
    // const page = 2;
    const products = await Product.find(filter)
      .limit(perPage) // 4
      .skip((page - 1) * perPage) //
      .sort({ _id: -1 });
    // .sort(sorted);
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
const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};

module.exports = {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};

// // load all the models
// const Product = require("../models/product");
// const getProducts = async (category) => {
//   try {
//     let filters = {};
//     if (category) {
//       filters.category = category;
//     }
//     /*
//       sorting > 1 is asc, -1 is desc
//       default sorting is sort by _id > { _id: 1 }
//       */
//     const products = await Product.find(filters).sort({ _id: -1 });
//     return products;
//   } catch (error) {
//     throw new Error(error);
//   }
// };

// // get 1 product
// const getProduct = async (id) => {
//   const product = await Product.findById(id);
//   return product;
// };

// // add
// const addProduct = async (name, description, price, category) => {
//   // create new product
//   const newProduct = new Product({
//     name,
//     description,
//     price,
//     category,
//   });
//   // save the product with mongodb
//   await newProduct.save();
//   return newProduct;
// };

// // update
// const updateProduct = async (
//   product_id,
//   name,
//   description,
//   price,
//   category
// ) => {
//   const updatedProduct = await Product.findByIdAndUpdate(
//     product_id,
//     {
//       name,
//       description,
//       price,
//       category,
//     },
//     { new: true } // send in the updated data
//   );
//   return updatedProduct;
// };

// // delete
// const deleteProduct = async (id) => {
//   return await Product.findByIdAndDelete(id);
// };

// module.exports = {
//   getProducts,
//   getProduct,
//   addProduct,
//   updateProduct,
//   deleteProduct,
// };
