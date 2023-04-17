const mongoose = require('mongoose');

const orderDetailSchema =  new mongoose.Schema({
    order: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Order' 
    },
    dish: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Dish' 
    },
    order_dish_status: {
        type: String,
        require: true,
    },
    order_dish_qty: {
        type: Number,
        require: true,
    },
    order_dish_total: {
        type: Number,
        require: true,
    }
});
orderDetailSchema.index({ dish: 1, order: 1 }, { unique: true });

module.exports = OrderDetail = mongoose.model('OrderDetail', orderDetailSchema);