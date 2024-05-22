const kanjiRouter = require('express').Router();
const auth = require('../middleware/auth')
const { getKanji } = require('../controllers/Kanji');

kanjiRouter.get('/', auth, getKanji);


module.exports = kanjiRouter