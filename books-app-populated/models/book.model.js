const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    title: String,
    description: String,
    author:
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Author'  // Nombre del modelo referenciado
        }],
    rating: Number
}, {
    timestamps: true
})

const Book = mongoose.model("Book", bookSchema);

module.exports = Book