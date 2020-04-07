const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const path = require("path");
require('dotenv').config();

const port = process.env.HTTP_PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "frontend/build")))

const uri = 'mongodb+srv://Kanban-User:ZAQ%212wsx@kanban-arkwo.mongodb.net/kanbak?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const router = require('./routes/routes');
app.use(router);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});