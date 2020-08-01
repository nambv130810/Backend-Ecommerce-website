var Bill = require('../../models/bill.model');

module.exports.index =  async function(req, res) {
    try {
        var bills = await Bill.find();
        res.json(bills);
    }catch(err) {
        res.json({ message: err });
    }
};

module.exports.postCreate = async function(req, res) {
    var bill = new Bill(
        {
            date: req.body.date,
            user_id: req.body.user_id,
            bill_id: req.body.bill_id
        }
    );
    try {
        var savedBill = await bill.save();
        res.json(savedBill);
    }catch(err) {
        res.json({ message: err });
    }
}