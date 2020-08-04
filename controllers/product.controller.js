
 
const Product = require('../models/product.model');
const Category = require('../models/category.model');

const { json } = require('body-parser');

module.exports.index = async function(req, res) {
    var products = await Product.find();
    var categories = await Category.find();
    var page = parseInt(req.query.page) || 1;
    var limit = 5;
    var start = (page-1) * limit;
    var end = page * limit;
    var pages  = Math.ceil(products.length/5);
    res.render('products/index', {
        products: products.slice(start, end),
        categories: categories,
        pages: pages+1
    });
};

module.exports.search = async function(req, res) {
    var q = req.query.q;
    var products = await Product.find();
    var matchedProds = products.filter(function(prod) {
        return prod.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    
    res.render('products/index', {
        products: matchedProds
    });
};

module.exports.create = async function(req, res) {
    var categories = await Category.find();
    res.render('products/create', {
        categories: categories
    });
};

module.exports.view = async function(req, res) {
    var id = req.params.id;
    var product = await Product.find({ _id: id});
    res.render('products/view', {
        product: product[0]
    });
};  

module.exports.postCreate = async function(req, res) {
    var product = new Product({
        name: req.body.name,
        imgUrl: "http://localhost:3000/images/" + req.body.imgUrl,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        cate_id: req.body.cate_id
    });
    
    var newProd = await product.save();
    
    try {
        res.redirect('/products');
    }catch(err) {
        res.json(err);
    }
};

module.exports.edit = async function(req, res) {
    var id = req.params.id;
    var product = await Product.find({ _id: id});
    var categories = await Category.find();
    res.render('products/edit', {
        product: product[0],
        categories: categories
    });
}

module.exports.patchEdit = async function(req, res) {
    try {
        var updatedProd = await Product.updateOne(
            { _id: req.params.id },
            { $set: {
                name: req.body.name,
                imgUrl: "http://localhost:3000/images/" + req.body.imgUrl,
                description: req.body.description,
                price: req.body.price,
                quantity: req.body.quantity,
                cate_id: req.body.cate_id
            }}
        );
        
        res.redirect('/products');
    }catch(err) {
        res.json({ message: err });
    }
};

module.exports.delete = async function(req, res) {
    var removedProd = await Product.findByIdAndRemove({ _id: req.params.id });
    res.redirect('/products');
};
