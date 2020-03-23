const router = require('express').Router();
const mongoose = require('mongoose');

var collecionName;

const columnSchema = new mongoose.Schema({ 
    name: String,
    description: String,
    user: String,
  },{ collection: collecionName });

const Column = mongoose.model('Column', columnSchema);
module.exports = Column;

router.route('/addColumn').post((req, res) => {
    collecionName = req.body.status;
    res.json('Column name set !')
  });