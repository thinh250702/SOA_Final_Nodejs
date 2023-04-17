var Table = require('../models/table');
var Dish = require('../models/dish');
var Cart = require('../models/cart');
var Order = require('../models/order');
var Invoice = require('../models/invoice');
var OrderDetail = require('../models/orderdetail');

async function placeOrder (req, res, next) {
    try {
        Table.findOne({table_id: req.params.tableID.toUpperCase()}).then(table => {
            Invoice.findOne({table: table._id, invoice_status: false}).then(invoice => {
                Order.create({
                    order_status: "Placed",
                    order_total: 0,
                    invoice: invoice._id,
                }).then((order) => {
                    Cart.find({table: table._id}).populate('dish').then(cart => {
                        cart.forEach(obj => {
                            OrderDetail.create({
                                order: order._id,
                                dish: obj.dish._id,
                                order_dish_status: "Waiting",
                                order_dish_qty: obj.cart_dish_qty,
                                order_dish_total: obj.cart_dish_total
                            })
                        })
                        res.redirect("/table");
                    })
                })
            })
        })
        
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    placeOrder
};