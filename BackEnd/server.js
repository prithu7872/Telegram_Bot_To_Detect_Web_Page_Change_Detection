import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import bodyParser from "body-parser";
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse form data
app.use(express.json());
app.use(cors());
// server.js - Add static files serving
app.use('/uploads', express.static('uploads'));

/*
app.use((req, res, next) => {
  console.log("Request Method:", req.method);
  console.log("Request URL:", req.url);
  console.log("Request Headers:", req.headers);
  console.log("Request Body:", req.body);
  next();
});
*/

app.use("/api/products", productRoutes);
// Serve the index.html file

app.listen(port, () => {
  connectDB();
  console.log(`server started at ${port}`);
});
