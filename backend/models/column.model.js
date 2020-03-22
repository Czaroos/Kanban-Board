const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const columnSchema = new Schema({
    status: { type: String, required: true },
});

const Column = mongoose.model('Column', columnSchema);
module.exports = Column;