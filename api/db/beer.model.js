const mongoose = require('mongoose');


const beerSchema = mongoose.Schema({
    brewery: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brew'
    },
    title: String,
    sort: String, 
    about: String,
    abv: Number,
    ibu: Number,
    ebc: String, 
    ph: String,
    onceSupplyVolume: String,
    permanentSupplyVolume: String,
    tareVolume: String,
    onceSupplyPrice: Number,
    permanentSupplyPrice: Number,
    imageUrl: String,
});

const Beer = mongoose.model('Beer', beerSchema);

module.exports = Beer;
