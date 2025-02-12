import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
dotenv.config();
import bodyParser from "body-parser";
const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/products", productRoutes)
// Serve the index.html file

app.listen(port, () => {
  connectDB();
  console.log(`server started at ${port}`);
});
