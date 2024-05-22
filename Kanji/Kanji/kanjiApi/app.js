const express = require('express');
const app = express();
const CORS = require('cors');
const mongoose = require('mongoose');
const router = require('./routes/routes');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { PORT = 3000, DB_URL = 'mongodb+srv://admin:Evilgood666@cluster0.lsxsfds.mongodb.net/Users' } = process.env;


mongoose.connect(DB_URL)
.then((e) => console.log("Ok, connect"))
.catch((err) => console.log(`Ошибка ${err}`));


router.get('/gif/:kanji', async (req, res, next) => {
  try{
      res.sendFile(__dirname + `/public/gifs/${req.params.kanji}.gif`)
  } catch(err) {
      next(err)
  }
})


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(CORS())
app.use('/', router)
app.use(helmet());
app.listen(PORT, () => {
    console.log(`Link: http://localhost:${PORT}`);
  });