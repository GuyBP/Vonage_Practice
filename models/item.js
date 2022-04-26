const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: String,
    type: String,
    color: String
});

module.exports = mongoose.model('Item', ItemSchema);