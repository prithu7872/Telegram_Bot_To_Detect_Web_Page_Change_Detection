import express from "express";
import mongoose from "mongoose";
import Product from "../models/product.model.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", upload.single("image"), async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  const { name, price } = req.body;
  const imageFile = req.file;
  if (!name.trim() || !price || !imageFile.path) {
    return res.status(400).json({
      success: false,
      message: "Name, price, and valid image are required",
    });
  } else {
    const image_path = imageFile.path;
    const newProduct = new Product({
      name: name.trim(),
      price: price,
      image: image_path,
    });
    try {
      await newProduct.save();
      res.status(201).json({
        success: true,
        message: "Product created successfully",
        product: newProduct,
      });
    } catch (err) {
      console.error("Product creation error:", err);
      res.status(500).json({
        success: false,
        message: err.message || "Server error during product creation",
      });
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
