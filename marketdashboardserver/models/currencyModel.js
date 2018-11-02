var mongoose = require('mongoose');


const Schema = mongoose.Schema;

const currencyModel = new Schema({
    naam: { type: String },
    prijs: { type: Number },
    prijsverandering: { type: Number },
    prijsveranderingpercent: { type: Number },
    stijgend: {type: Boolean}
});

module.exports = mongoose.model('currencies',currencyModel)