const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    location: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    reviews: {
        type: [String]
    }
}, { timestamps: true });

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = Restaurant;