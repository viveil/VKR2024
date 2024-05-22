const Kanji = require('../models/Kanji');

module.exports.getKanji = (req, res, next) => {
    Kanji.find({})
    .then((kanji) => res.send(kanji))
    .catch(next);
}