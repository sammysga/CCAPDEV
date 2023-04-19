const mongoose = require('mongoose');

// Define schema for food spot
const foodSpotSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    stallImg: {
        type: String
    },
    coverImg: {
        type: String
    },
    menuImg: {
        type: String
    },
    overallRating: {
        type: Number
    },
    cuisine: {
        type: String,
        required: true
    },
    overallPrice: {
        type: Number
    },
    overallWWaitTime: {
        type: Number
    }
});

// Create Mongoose model
const FoodSpot = mongoose.model('FoodSpot', foodSpotSchema);

// Export the model
module.exports = FoodSpot;
