const router = require("express").Router()

router.get('/userstest', (req, res) => {
    res.send('users test is succesfull')
})

router.post('/usersposttest', (req, res) => {
    const username = req.body.username
    res.send(`your username is ${username}`)
})

module.exports = router