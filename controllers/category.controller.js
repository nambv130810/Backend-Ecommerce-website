var db = require('../database/db');
var shortid = require('shortid');

var Category = require('../models/category.model');
const Product = require('../models/product.model');

module.exports.index = async function(req, res) {
    var categories = await Category.find();
    
    res.render('categories/index', {
        categories: categories
    });
};

module.exports.search = async function(req, res) {
    var q = req.query.q;
    var categories = await Category.find();

    var matchedCategories = categories.filter(function(cate) {
        return cate.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    console.log(req.query);
    res.render('categories/index', {
        categories: matchedCategories
    });
};

module.exports.create = function(req, res) {
    res.render('categories/create')
};

module.exports.view = async function(req, res) {
    var id = req.params.id;
    var category = await Category.find({ _id: id });

    res.render('categories/view', {
        category: category[0]
    });
};

module.exports.postCreate = async function(req, res) {
    
    var errors = [];
    if(!req.body.name) {
        errors.push("Không được để trống tên danh mục");
    }
    if(errors.length) {
        res.render('categories/create', {
            errors: errors
        })
        return;
    }
    var category = new Category({
        name: req.body.name,
        cate_id: req.body.cate_id
    });

    var newCategory = await category.save();

    try {
        res.redirect('/categories');
    }catch(err) {
        res.json(err);
    }
};

module.exports.edit = async function(req, res) {
    var id = req.params.id;
    var category = await Category.find({ _id: id});

    res.render('categories/edit', {
        category: category[0]
    });
};
module.exports.patchEdit = async function(req, res) {
    try {
        var updatedCate = await Category.updateOne(
            { _id: req.params.id },
            { $set: {
                name: req.body.name,
            }}
        );
        res.redirect('/categories');
    }catch(err) {
        res.json({ message: err });
    }
};

module.exports.delete = async function(req, res) {
    var removedCategory = await Category.findByIdAndRemove({ _id: req.params.id });
    var removedProduct = await Product.remove({ cate_id: removedCategory.cate_id });

    res.redirect('/categories');
};

