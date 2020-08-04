
var Bill = require('../models/bill.model');
var User = require('../models/user.model');
var Product = require('../models/product.model');
var BillDetail = require('../models/bill-detail.model');


module.exports.index = async function(req, res) {
    var bills = await Bill.find();
    var page = parseInt(req.query.page) || 1;
    var limit = 5;
    var start = (page-1) * limit;
    var end = page * limit;
    var pages  = Math.ceil(bills.length/5);
    res.render('bills/index', {
        bills: bills.slice(start, end),
        pages: pages + 1
    });
};

module.exports.search = async function(req, res) {
    var q = req.query.q;
    var bills = await Bill.find();

    var matchedBills = bills.filter(function(bill) {
        return bill.date.toString().toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    
    res.render('bills/index', {
        bills: matchedBills
    });
};

module.exports.create = function(req, res) {
    res.render('bills/create')
};

module.exports.view = async function(req, res) {
    var id = req.params.id;
    var bill = await Bill.find({ _id: id });
    //var user = await User.find({ user_id: bill[0].user_id });

    var billDetail = await BillDetail.find({ bill_id: bill[0]._id });
    //var billDetail = await BillDetail.find();

    var products = await Product.find({});

    res.render('bills/view', {
        bills: billDetail,
        products: products,
        total: 0
    });
};

module.exports.postCreate =  async function(req, res) {
    var errors = [];
    if(!req.body.date) {
        errors.push("Không được để trống ngày lập");
    }
    if(!req.body.username) {
        errors.push("Tên khách hàng không hợp lệ ");
    }
    if(errors.length) {
        res.render('bills/create', {
            errors: errors,
            values: req.body
        })
        return;
    }
    var bill = new Bill({
        date: Date.now(),
        user_id: req.body.user_id
    });

    var newBill = await bill.save();

    try {
        res.redirect('/bills');
    }catch(err) {
        res.json(err);
    }
};

module.exports.edit = async function(req, res) {
    var id = req.params.id;
    var bill = await Bill.find({ _id: id });
    res.render('bills/edit', {
        bill: bill[0]
    });
};
module.exports.patchEdit = async function(req, res) {
    try {
        var updatedBill = await Bill.updateOne(
            { _id: req.params.id },
            { $set: {
                date: req.body.date,
                username: req.body.username
            }}
        );
        res.redirect('/bills');
    }catch(err) {
        res.json({ message: err });
    }
};