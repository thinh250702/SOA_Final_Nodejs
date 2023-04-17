var Employee = require('../models/employee')

async function getPage (req, res, next) {
    res.render('table_detail');
}

async function logout (req, res, next) {
    req.session.destroy();
    res.redirect('/login');
}

async function login (req, res, next) {
    if(req.session.userID){
        res.redirect('/table');
    } 
    else {
        if(req.method === 'GET'){
            res.render('login', {errorMessage: false });
        }
        if(req.method === 'POST'){
            try {
                Employee.findOne({emp_id: req.body.pin_code,})
                    .then(result => {
                        // console.log(result.emp_name)
                        if (!result) {
                            // res.json({success: false, statusCode: 403, errorMessage: 'Authentication failed. Employee not found.'});
                            res.render('login', {errorMessage: "Wrong PIN Code." });
                        } else {
                            session = req.session;
                            session.userID = req.body.pin_code;
                            // res.json({
                            //     success: true,
                            //     statusCode: 200,
                            //     message: 'You are logged in successfully!'
                            // });
                            res.redirect('/table');
                        }
                    });
            } catch (error) {
                console.log(error);
            }
        }
    }
    
}

module.exports = {
    login, getPage, logout
};