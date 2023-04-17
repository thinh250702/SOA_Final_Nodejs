const mongoose = require('mongoose');

const employeeSchema =  new mongoose.Schema({
    emp_id: {
        type: String,
        unique: true,
        require: true,
    },
    emp_name: {
        type: String,
        require: true,
    },
    emp_role: {
        type: String,
        require: true,
    }
});

module.exports = Employee = mongoose.model('Employee', employeeSchema);

