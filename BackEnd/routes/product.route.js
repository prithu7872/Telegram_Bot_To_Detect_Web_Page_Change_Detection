import express from "express";
import mongoose from "mongoose";
import path from "path";
import Product from "../models/product.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html")); // Use __dirname to resolve file path
});

router.get("/2",async (req, res) => {
    try{
        const products = await Product.find({});
        res.status(200).json({success: true, data: products});
    }
    catch(err){
        res.status(500).json({success: false, message: "Server error"});
    }
})

router.post("/", async (req, res) => {
  const { name, price, image } = req.body;
  if (!name || !price || !image) {
    return res.status(400).json({ message: "Please fill all the fields" });
  } else {
    console.log(`${name} ${price} ${image}`);
    const newProduct = new Product(req.body);
    try {
      await newProduct.save();
      res
        .status(201)
        .json({ success: true, message: "Product added successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Something went wrong" });
    }
  }
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product Id" });
  }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    return res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
