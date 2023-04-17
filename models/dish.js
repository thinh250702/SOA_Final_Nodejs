const mongoose = require('mongoose');

const dishSchema =  new mongoose.Schema({
    dish_name: {
        type: String,
        require: true,
    },
    dish_dsc: {
        type: String,
        require: true,
    },
    dish_img: {
        type: String,
        require: true,
    },
    unit_price: {
        type: Number,
        require: true,
    },
    dish_status: {
        type: Boolean,
        require: true,
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category"
    }
});

module.exports = Dish = mongoose.model('Dish', dishSchema);