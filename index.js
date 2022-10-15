const express = require("express")
const app = express()
const dotenv = require("dotenv")
const userRoutes = require('./routes/users')
const authRoutes = require('./routes/auth')

dotenv.config()

const mongoose = require("mongoose")
mongoose.connect(process.env.MONGO_DB)
.then(() => {console.log("DBConnection succesfully!")})
.catch((error) => {
    console.log(error)
    throw new Error()
})

app.use(express.json())
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)

app.listen(process.env.PORT || 4000, () => {
    console.log("Backend server is running!")
})