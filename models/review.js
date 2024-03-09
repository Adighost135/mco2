const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    foundHelpful: [mongoose.SchemaTypes.ObjectId],
    media: [String]
}, { timestamps: true });

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review; 