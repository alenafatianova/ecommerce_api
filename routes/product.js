const router = require("express").Router()
const Product = require("../models/Product");
const { verifyAndAuth, verifyAsAdmin } = require("./verifyToken")

// CREATE PRODUCT 
// access belongs to the admin only!
router.post("/", verifyAsAdmin, async (req, res) => {
    const newProduct = new Product(req.body)
    
    try {
        const savedProduct = await newProduct.save()
        res.status(200).json(savedProduct)
    } catch (err) {
        res.status(400).json(err)
    }
})

// UPDATE PRODUCT
// access belongs to the admin only!
router.put("/:id", verifyAsAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {new: true})
    res.status(200).json(updatedProduct);
  } catch(err) {
    res.status(400).json(err);
  };
});


// DELETE PRODUCT
// access belongs to the admin only!
router.delete("/:id", verifyAsAdmin, async (req, res) => {
    try {
        Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has been deleted")
    } catch (err) {
        res.status(400).json(err)
    };
});

// GET PRODUCT
router.get("/find/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        res.status(400).json(err)
    };
});

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
    const queryNew = req.query.new;
    const queryCategory = req.query.category
    try {
       let products;
        if (queryNew) {
            products = await Product.fins().sort({createdAt: -1}).limit(20)
        } else if(queryCategory) {
            products = await Product.find({categories: {$in: [queryCategory]}
            });
        } else {
            products = await Product.find();
        }
        res.status(200).json(products);
    } catch (err) {
        res.status(400).json(err)
    };
});

module.exports = router