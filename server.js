const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());

//cors IMPORTANT
const corsHandler = cors({
  origin: "*",
  methods: "GET,PUT,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  preflightContinue: true,
  optionsSuccessStatus: 200,
});

app.use(corsHandler);
mongoose
  .connect("mongodb://127.0.0.1:27017/ecommercepractice")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log(error);
  });

const productRouter = require("./routes/product");
const categoryRouter = require("./routes/category");
const orderRoute = require("./routes/order");

app.use("/products", productRouter);
app.use("/categories", categoryRouter);
app.use("/orders", orderRoute);

app.listen(5000, () => {
  console.log("Server is running at http://localhost:5000");
});
