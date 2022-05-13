const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({

    name: {type:String, required:true},
    manaCost: {
        red: Number,
        green: Number,
        blue: Number,
        white: Number,
        black: Number,
        colorless: Number,
        x: Boolean
    },
    img: {type:String, required:true},
    typeLine: {
        type: {type:String, required:true},
        subTypes: [String]
    },
    rarity: String,
    text: String,
    stats: {
        power: Number,
        toughness: Number,
        loyalty: Number
    },
    misc: {
        expansion: String,
        illustrator: String,
        collectorNum: Number
    }

});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
