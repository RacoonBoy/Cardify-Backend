var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var bodyParser = require('body-parser');
var logger = require('morgan');

var app = express();
var userRoute = require('./routes/user')
var deckRoute = require('./routes/deck')
const mongoose = require("mongoose");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));


// connect to database
mongoose.connect(process.env.MONGODB)
    .then(() => console.log("Connected"))
    .catch(err => console.log(err))
mongoose.connection.on("error", err => {
  console.error("MongoDB connection error:", err);
});

// route request
app.use('/users',userRoute)
app.use('/decks',deckRoute)
app.get('/', (req,res) => {
  res.send ("OK")
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next){
  if(err) console.log(err)
})

module.exports = app;
