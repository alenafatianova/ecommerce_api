const mongoose = require("mongoose")


const ProductSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        description: { type: String, required: true, unique: true },
        categories: { type: Array },
        price: { type: Number, required: true },
        size: { type: String, required: true },
        image: { type: String, required: true },
        image: { type: String, required: true },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Product', ProductSchema)