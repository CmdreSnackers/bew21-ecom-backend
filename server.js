const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { MONGODB_URL } = require("./config");

const app = express();

//middleware for json req
app.use(express.json());
// set the uploads folder as static path
app.use("/uploads", express.static("uploads"));

//setup cors policy IMPORTANT
const corsHandler = cors({
  origin: "*",
  methods: "GET,PUT,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  preflightContinue: true,
  optionsSuccessStatus: 200,
});

app.use(corsHandler);
mongoose
  .connect(MONGODB_URL + "ecommercepractice")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log(error);
  });

const productRouter = require("./routes/product");
const categoryRouter = require("./routes/category");
const orderRoute = require("./routes/order");
const paymentRoute = require("./routes/payment");
const imagesRoute = require("./routes/images");
const userRoute = require("./routes/user");

app.use("/products", productRouter);
app.use("/categories", categoryRouter);
app.use("/orders", orderRoute);
app.use("/payment", paymentRoute);
app.use("/images", imagesRoute);
app.use("/users", userRoute);

app.listen(5000, () => {
  console.log("Server is running at http://localhost:5000");
});
