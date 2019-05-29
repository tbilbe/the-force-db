const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config.json');
const MongoClient = require('mongodb');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json())
app.set('view engine', 'ejs');
let db;

MongoClient.connect(`mongodb://${config.development.user}:${config.development.password}@ds263656.mlab.com:63656/quotes-star-wars`, (err, database) => {
  if (err) {
    console.log(err);
  } else {
    db = database.db(config.development.database)
    app.listen(3000, () => console.log('running mofo, on: port 3000'))
  }
});

app.get('/', (req, res) => {
  console.log(typeof config.development.database)
  const cursor = db.collection('quotes')
    .find()
    .toArray((err, results) => {
      if (err) return console.log(err);
      res.render('index.ejs', {
        quotes: results,
      });
    });
});

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err);
    console.log('i think we saved something to the db!');
    res.redirect('/');
  })
  const bod = req.body;
  console.log(bod);

})