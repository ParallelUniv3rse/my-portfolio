var express = require('express');
var router = express.Router();
var path = require('path');
var indexModel = require(path.join(__dirname, "../models/index.js"));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    'title': "Arnost Neurad | Multimedia designer & Front-end magician"
  });
});

/* GET about page. */
router.get('/whoTheHell', function(req, res, next) {
  res.render('about', {
    'title': "Arnost Neurad | Who the hell am I?"
  });
});

/* GET inspirations page. */
router.get('/isInspired', function(req, res, next) {
  res.render('inspirations', {
    'title': "Arnost Neurad | What and who inspires me?"
  });
});

/* GET goals page. */
router.get('/hasGoals', function(req, res, next) {
  res.render('goals', {
    'title': "Arnost Neurad | Who do I aspire to be?"
  });
});

module.exports = router;
