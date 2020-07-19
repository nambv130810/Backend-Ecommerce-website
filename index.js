const express = require('express')
const app = express()

const port = 3000;
app.set('view engine', 'pug');
app.set('views', './views');

var products = [
    {id: 1, name: "Iphone 5"},
    {id: 2, name: "Iphone 6"},
    {id: 3, name: "Iphone 7"},
    {id: 4, name: "Iphone 8"}
];


app.get('/', function(req, res) {
    res.render('home');
});

app.get('/products', function(req, res) {
    res.render('products/index', {
        products: products
    });
})
app.get('/products/search', function(req, res) {
    var q = req.query.q;
    var matchedProds = products.filter(function(prod) {
        return prod.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    })
    console.log(req.query);
    res.render('products/index', {
        products: matchedProds
    });
})
app.get('/categories', function(req, res) {
    res.render('categories/index');
});

app.get('/bills', function(req, res) {
    res.render('bills/index');
});
app.get('/accounts', function(req, res) {
    res.render('accounts/index');
})
app.listen(port, function() {
    console.log(`Server is running on ${port}`);
});