const mongoose = require('mongoose');

const tableSchema =  new mongoose.Schema({
    table_id: {
        type: String,
        unique: true,
        require: true,
    },
    max_cap: {
        type: Number,
        require: true,
    },
    table_status: {
        type: Boolean,
        require: true,
    }
});

module.exports = Table = mongoose.model('Table', tableSchema);