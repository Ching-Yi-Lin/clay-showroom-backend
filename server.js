var express = require("express"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose");
dotenv = require("dotenv"),
cors = require("cors");

//load the environment variables from the .env file
dotenv.load();

var isProduction = process.env.NODE_ENV === "production";

// Create global app object
var app = express();
var whitelist = ["http://localhost:3000"]; //white list consumers
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true, //Credentials are cookies, authorization headers or TLS client certificates.
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'device-remember-token', 'Access-Control-Allow-Origin', 'Origin', 'Accept']
};
app.use(cors(corsOptions));


// Normal express config defaults
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Models
require("./models/Article");
require("./models/User");
require("./models/Product");

// Routes
app.use(require("./routes"));

// Database
mongoose.connect(process.env.MONGODB_URI);

/// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use(function (err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

// finally, let's start our server...
var server = app.listen(process.env.PORT || 3001, function () {
  console.log("Listening on port " + server.address().port);
});
