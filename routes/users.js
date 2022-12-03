const User = require("../models/User");
const { verifyAndAuth } = require("./verifyToken")
const router = require("express").Router()

// UPDATE USER
router.put("/:id", verifyAndAuth, async (req, res) => {
  if (req.body.password) {
    req.body.password = cryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {new: true})
    res.status(200).json(updatedUser);
  } catch(err) {
    res.status(500).json(err);
  };
});

// DELETE

router.delete("/:id", verifyAndAuth, async (req, res) => {
    try {
        User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted")
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router