const mongoose = require('mongoose');


const kanjiSchema = new mongoose.Schema({
    level: {
        type: Number,
        required: true,
    },
    translate: {
        type: String,
        required: true,
    },
    symbol: {
        type: String,
    },
    type: {
        type: String,
    },
    hint: {
        type: String,
    },
    gif: {
        type: String,
    },
    value: {
        type: Array,
        required: true,
        default: [],
    },
    KUN: {
        type: Array,
        required: true,
        default: [],
    },
    ON: {
        type: Array,
        required: true,
        default: [],
    },
    radical: {
        type: Array,
        required: true,
        default: [],
    },
})


module.exports = mongoose.model('Kanji', kanjiSchema);