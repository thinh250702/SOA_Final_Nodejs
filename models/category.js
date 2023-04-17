const mongoose = require('mongoose');

const categorySchema =  new mongoose.Schema({
    cate_name: {
        type: String,
        require: true,
    }
});

module.exports = Category = mongoose.model('Category', categorySchema);