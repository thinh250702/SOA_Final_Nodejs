const mongoose = require('mongoose');

const cartSchema =  new mongoose.Schema({
    table: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Table' 
    },
    dish: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Dish' 
    },
    cart_dish_qty: {
        type: Number,
        require: true,
    },
    cart_dish_total: {
        type: Number,
        require: true,
    }
});
cartSchema.index({ table: 1, dish: 1 }, { unique: true });

module.exports = Cart = mongoose.model('Cart', cartSchema);