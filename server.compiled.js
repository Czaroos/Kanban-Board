"use strict";

var express = require('express');

var cors = require('cors');

var mongoose = require('mongoose');

var bodyParser = require("body-parser");

var path = require("path");

require('dotenv').config();

var port = process.env.HTTP_PORT || 5000;
var app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(express["static"](path.join(__dirname, "frontend/build")));
var uri = 'mongodb+srv://Kanban-User:ZAQ%212wsx@kanban-arkwo.mongodb.net/kanbak?retryWrites=true&w=majority';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
var connection = mongoose.connection;
connection.once('open', function () {
  console.log("MongoDB database connection established successfully");
});

var router = require('./routes/routes');

app.use(router);
app.listen(port, function () {
  console.log("Server is running on port: ".concat(port));
});
