const mongoose = require('mongoose');

const orderSchema =  new mongoose.Schema({
    order_status: {
        type: String,
        require: true,
    },
    place_time: {
        type: Date,
        default: Date.now,
        require: true,
    },
    order_total: {
        type: Number,
        require: true,
    },
    invoice: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Invoice' 
    },
});

module.exports = Order = mongoose.model('Order', orderSchema);