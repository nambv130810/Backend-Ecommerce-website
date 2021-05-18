
 
const Product = require('../models/product.model');
const Category = require('../models/category.model');

const { json } = require('body-parser');

module.exports.index = async function(req, res) {
    var products = await Product.find();
    var categories = await Category.find();
    var page = parseInt(req.query.page) || 1;
    var limit = 8;
    var start = (page-1) * limit;
    var end = page * limit;
    var pages  = Math.ceil(products.length/8);
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
    
    var categories = await Category.find();
    if(req.body.name == '' || req.body.imgUrl == '' || req.body.description == '' || req.body.price == '' || req.body.quantity == '' ) {
        res.render('products/create', {
            errors: [
                'Bạn phải điền đầy đủ thông tin'
            ],
            categories: categories
        })
        return;
    }
    var data = [];
    for(var i = 0; i < req.files['thumbnailUrl'].length; i++) {
        data.push('http://localhost:3000' + req.files['thumbnailUrl'][i].path.slice(7))
    }
    var product = new Product({
        name: req.body.name,
        imgUrl: 'http://localhost:3000' + req.files['imgUrl'][0].path.slice(7),
        thumbnailUrl: data,
        description: req.body.description,
        price: req.body.price,
        salePrice: req.body.salePrice,
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
        var data = [];
        for (var i = 0; i < req.files['thumbnailUrl'].length; i++) {
            data.push('http://localhost:3000' + req.files['thumbnailUrl'][i].path.slice(7))
        }
        var updatedProd = await Product.updateOne(
            { _id: req.params.id },
            { $set: {
                name: req.body.name,
                imgUrl: 'http://localhost:3000' + req.files['imgUrl'][0].path.slice(7),
                thumbnailUrl: data,
                description: req.body.description,
                price: req.body.price,
                salePrice: req.body.salePrice,
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
