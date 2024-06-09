const express = require('express');
const router = express.Router();
const upload = require('../config/multer-config');
const productModel = require('../models/product-model');

router.post("/create", upload.single('image'), async (req, res) => {
  try {
    const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

    console.log('Request Body:', req.body); // Log the request body to check if price is being sent
    console.log('File:', req.file); // Log the file data

    // Check if the price is not an empty string
    const productPrice = price || null;

    // Convert image buffer to Base64 string
    const imageBase64 = req.file ? req.file.buffer.toString('base64') : '';

    const product = new productModel({
      image: imageBase64,
      name,
      price: productPrice,
      discount,
      bgcolor,
      panelcolor,
      textcolor
    });

    await product.save();

    req.flash('success', 'Product created successfully');
    res.redirect('/owners/admin');
  } catch (error) {
    req.flash('error', 'Error creating product');
    res.status(500).redirect('/owners/admin');
    console.error(error);
  }
});

module.exports = router;
