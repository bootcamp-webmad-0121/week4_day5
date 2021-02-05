const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    title: String,
    description: String,
    author: String,
    rating: Number
}, {
    timestamps: true
})

const Book = mongoose.model("Book", bookSchema);

module.exports = Book