const mongoose = require('mongoose');

const invoiceSchema =  new mongoose.Schema({
    invoice_status: {
        type: Boolean,
        require: true,
    },
    pay_id: {
        type: String,
        require: true,
    },
    pay_method: {
        type: Boolean,
        require: true,
    },
    pay_amount: {
        type: Number,
        require: true,
    },
    table: {
        type: mongoose.Types.ObjectId,
        ref: "Table"
    }
});

module.exports = Invoice = mongoose.model('Invoice', invoiceSchema);