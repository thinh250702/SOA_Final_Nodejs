var Employee = require('../models/employee');
var Table = require('../models/table');
var Invoice = require('../models/invoice');
var Order = require('../models/order');
var OrderDetail = require('../models/orderdetail');

async function getLayout (req, res, next) {
    if (!req.session.userID) {
        res.redirect('/login');
    }
    else {
        Employee.findOne({emp_id: req.session.userID,}).then(result => {
            Table.find({}).then(table => {
                res.render('table', {
                    current: result.emp_name + " / " + result.emp_role,
                    table_lst: table,
                });
            })
        })
    }
}

async function openTable (req, res, next) {
    var open_id = req.body.table_id;
    Table.findOneAndUpdate({table_id: open_id}, {table_status: 1}).then((table) => {
        Invoice.create({ 
            invoice_status: false,
            pay_id: "",
            pay_method: false,
            pay_amount: 0,
            table: table._id
        })
    });
}

async function getTableDetail (req, res, next) {
    try {
        if (!req.session.userID) {
            res.redirect('/login');
        }
        else {
            Employee.findOne({emp_id: req.session.userID,}).then(result => {
                Table.findOne({table_id: req.params.tableID.toUpperCase()}).then(table => {
                    Invoice.findOne({table: table._id, invoice_status: false}).then(invoice => {
                        Order.find({invoice: invoice._id}).then(order_lst => {
                            OrderDetail.find({}).populate('dish').then(item_lst => {
                                console.log(item_lst)
                                res.render('tableDetail', {
                                    current: result.emp_name + " / " + result.emp_role,
                                    table: table,
                                    order_lst: order_lst,
                                    item_lst: item_lst,
                                    invoice: invoice,
                                });
                            })
                        })
                    })
                })
                
            })
        }
    } catch (error) {
        console.log(error)
    }
    
}

module.exports = {
    getLayout, openTable, getTableDetail
};