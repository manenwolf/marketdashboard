var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userModel = new Schema({
    username: { type: String },
    password: { type: String },
    salt: { type: String },
    timestamp: { type: Date },
    favorites: {type: [String]}
});

module.exports = mongoose.model('users',userModel)