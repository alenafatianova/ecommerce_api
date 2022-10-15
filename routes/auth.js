const User = require("../models/User")

const router = require("express").Router()


// REGISTER
router.post("/signup", async (req, res) => {
const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
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

module.exports = router