require('dotenv').config();


const express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

var cors = require('cors');

var productRoute = require('./routes/product.route');
var categoryRoute = require('./routes/category.route');
var billRoute = require('./routes/bill.route');
var accountRoute = require('./routes/account.route');
var authRoute = require('./routes/auth.route');
var userRoute = require('./routes/user.route');

var apiProdRoute = require('./api/routes/product.route');
const { reset } = require('nodemon');
var apiBillRoute = require('./api/routes/bill.route');
var apiUserRoute = require('./api/routes/user.route');
var apiBillDetailRoute = require('./api/routes/billDetail.route');


const app = express();

const port = 3000;


app.use(cors(
{
   origin: "*",
   methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
   allowedHeaders: 'Content-Type, Authorization, Origin, X-Requested-With, Accept'
 }
));

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));
app.use(cookieParser());



app.get('/', function(req, res) {
    res.render('home');
})
// products routes
app.use('/products', productRoute);

// categories routes
app.use('/categories', categoryRoute);

// bills routes
app.use('/bills', billRoute);

//accounts routes
//app.use('/accounts', accountRoute);

//users route
app.use('/users', userRoute);

//authenication route
app.use('/auth', authRoute);


//---------- products api route
app.use('/api/products',cors(), apiProdRoute);

app.use('/api/bills', cors(), apiBillRoute);

app.use('/api/users', cors(), apiUserRoute);

app.use('/api/bill_detail', cors(), apiBillDetailRoute);

// app's listening
app.listen(port, function() {
    console.log(`Server is running on ${port}`);
});