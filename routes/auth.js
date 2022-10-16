const User = require("../models/User")
const router = require("express").Router()
const cryptoJS = require("crypto-js")


// REGISTER
router.post("/signup", async (req, res) => {
const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: cryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString(),
    })
    
    try {
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
       
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
        throw new Error()
    }
})

// SIGN IN

router.post("/signin", async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username})
        !user && res.status(401).json("Wrong email or password!")
        
        const hashedPassword = cryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET )
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8.parse(user.password))
        originalPassword !== req.body.password && res.status(401).json("Wrong email or password!")

        const { password, ...others } = user;
        res.status(200).json(others)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
   
})

module.exports = router