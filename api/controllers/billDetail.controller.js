var BillDetail = require('../../models/bill-detail.model');

module.exports.index =  async function(req, res) {
    try {
        var billDetails = await BillDetail.find();
        res.json(billDetails);
    }catch(err) {
        res.json({ message: err });
    }
};

module.exports.postCreate = async function(req, res) {
    var billDetail = new BillDetail(
        {
            bill_id: req.body.bill_id,
            product_id: req.body.product_id,
            quantity: req.body.quantity,
            price: req.body.price
        }
    );
    try {
        var savedBillDetail = await billDetail.save();
        res.json(savedBillDetail);
    }catch(err) {
        res.json({ message: err });
    }
}
