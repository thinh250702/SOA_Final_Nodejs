var Table = require('../models/table');
var Dish = require('../models/dish');
var Category = require('../models/category');
var Cart = require('../models/cart');

async function getMenu (req, res, next) {
    try {
        if (!req.session.userID) {
            res.redirect('/login');
        }
        else {
            Employee.findOne({emp_id: req.session.userID,}).then(result => {
                Category.find({}).then(category => {
                    Dish.find({}).populate("category").then(dish => {
                        Table.findOne({table_id: req.params.tableID.toUpperCase()}).then(table => {
                            Cart.find({table: table._id}).populate("dish").then(cart => {
                                return res.render('menu', {
                                    current: result.emp_name + " / " + result.emp_role,
                                    tableID: req.params.tableID,
                                    cate_lst: category,
                                    dish_lst: dish,
                                    cart_lst: cart
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

async function addToCart (req, res, next) {
    try {
        Table.findOne({table_id: req.params.tableID}).then(table => {
            Dish.findById(req.body.dish).then(dish => {
                Cart.findOne({table: table._id, dish: dish._id}).then(result => {
                    if (result) {
                        Cart.findOneAndUpdate(
                            {table: table._id, dish: dish._id},{cart_dish_qty: req.body.qty, cart_dish_total: dish.unit_price * req.body.qty}).then(() => {
                                Cart.find({table: table._id}).populate("dish").then((data) => {
                                    var html = "";
                                    data.forEach(obj => {
                                        html += 
                                        `<div class='list_item'>
                                            <div>${obj.dish.dish_name}</div>
                                            <div>${obj.dish.unit_price}</div>
                                            <div class='order_qty_wrapper'>
                                                <span class='minus'>-</span>
                                                <span class='num'>${obj.cart_dish_qty}</span>
                                                <span class='plus'>+</span>
                                            </div>
                                        </div>`
                                    });
                                    res.send(html);
                                }) 
                        })
                    }
                    else {
                        Cart.create({ 
                            table: table._id,
                            dish: dish._id,
                            cart_dish_qty: req.body.qty,
                            cart_dish_total: dish.unit_price * req.body.qty, 
                        }).then(() => {
                            Cart.find({table: table._id}).populate("dish").then((data) => {
                                var html = "";
                                data.forEach(obj => {
                                    html += 
                                    `<div class='list_item'>
                                        <div>${obj.dish.dish_name}</div>
                                        <div>${obj.dish.unit_price}</div>
                                        <div class='order_qty_wrapper'>
                                            <span class='minus'>-</span>
                                            <span class='num'>${obj.cart_dish_qty}</span>
                                            <span class='plus'>+</span>
                                        </div>
                                    </div>`
                                });
                                res.send(html);
                            }) 
                        })
                    }
                })
            })
        })
    } catch (error) {
        console.log(error)
    }
}

async function updateCart (req, res, next) {
    try {
        
    } catch (error) {
        console.log(error)
    }
}



module.exports = {
    getMenu, addToCart, updateCart
};