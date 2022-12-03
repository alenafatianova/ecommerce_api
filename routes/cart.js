const router = require("express").Router()
const Cart = require("../models/Cart");
const { verifyAndAuth, verifyAsAdmin } = require("./verifyToken")

// CREATE CART 
router.post("/", verifyAndAuth, async (req, res) => {
    const newCart = new Cart(req.body)
    
    try {
        const savedCart = await newCart.save()
        res.status(200).json(newCart)
    } catch (err) {
        res.status(400).json(err)
    }
})

// UPDATE CART
router.put("/:id", verifyAndAuth, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {new: true})
    res.status(200).json(updatedCart);
  } catch(err) {
    res.status(400).json(err);
  };
});


// DELETE CART
router.delete("/:id", verifyAndAuth, async (req, res) => {
    try {
        Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Cart has been deleted")
    } catch (err) {
        res.status(400).json(err)
    };
});

// GET USER'S CART
// id - means id of the current user, not cart!
router.get("/find/:id", verifyAndAuth, async (req, res) => {
    try {
        const cart = await Cart.findOne({id: req.params.id});
        res.status(200).json(cart);
    } catch (err) {
        res.status(400).json(err)
    };
});

// GET ALL CARTS
// access belongs to the admin only!
router.get("/", verifyAsAdmin, async (req, res) => {
    try {
        const allCarts = await Cart.find()
        res.status(200).json(allCarts)
    } catch(err) {
        res.status(400).json(err)
    }
});


module.exports = router