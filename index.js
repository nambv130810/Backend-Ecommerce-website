require('dotenv').config();


const express = require('express');
var multer  = require('multer');
var upload = multer({dest: __dirname + '/uploads/images'});

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

var cors = require('cors');


// ====   PASSPORT ====
var passport = require('passport');
var flash = require('express-flash');
var session = require('express-session');

var Account = require('./models/account.model');
var initializePassport = require('./passport/passport-config');
var getUserByEmail = async function(email) {
    var accounts = await Account.find({ email: email });
    return accounts[0];
}
var getUserById = async function(id) {
  var accounts = await Account.find({ _id: id });
    return accounts[0];
}
initializePassport.initial(passport, getUserByEmail, getUserById);




var productRoute = require('./routes/product.route');
var categoryRoute = require('./routes/category.route');
var billRoute = require('./routes/bill.route');
var accountRoute = require('./routes/account.route');
var authRoute = require('./routes/auth.route');
var userRoute = require('./routes/user.route');
var thumbnailRoute = require('./routes/thumbnail.route');
var homeRoute = require('./routes/home.route');
var loginRoute = require('./routes/login.route');
var registerRoute = require('./routes/register.route');


var apiProdRoute = require('./api/routes/product.route');
const { reset } = require('nodemon');
var apiBillRoute = require('./api/routes/bill.route');
var apiUserRoute = require('./api/routes/user.route');
var apiBillDetailRoute = require('./api/routes/billDetail.route');
var apiThumbnailRoute = require('./api/routes/thumbnail.route');

var authMiddleware = require('./middlewares/auth.middleware');


const app = express();

const port = process.env.PORT || 3000;


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
app.use(express.static('uploads'));
app.use(cookieParser());
app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/', homeRoute);
// products routes
app.use('/products', productRoute);

// categories routes
app.use('/categories', categoryRoute);

// bills routes
app.use('/bills', billRoute);

//accounts routes
app.use('/accounts', accountRoute);

//users route
app.use('/users', userRoute);

//authenication route
app.use('/auth', authRoute);

// thumbnails images route
app.use('/thumbnails', thumbnailRoute);

//---------- products api route
app.use('/api/products',cors(), apiProdRoute);

app.use('/api/bills', cors(), apiBillRoute);

app.use('/api/users', cors(), apiUserRoute);

app.use('/api/bill_detail', cors(), apiBillDetailRoute);

app.use('/api/thumbnails', cors(), apiThumbnailRoute);

// LOG IN
app.use('/login', loginRoute);
// REGISTER
app.use('/register', registerRoute);
// LOG OUT
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// app's listening
app.listen(port, function() {
    console.log(`Server is running on ${port}`);
});