var express = require('express');
var router = express.Router();
var path = require('path');
var indexModel = require(path.join(__dirname, "../models/index.js"));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {});
});

/* GET about page. */
router.get('/whoTheHell', function(req, res, next) {
  res.render('about', {});
});

/* GET inspirations page. */
router.get('/isInspired', function(req, res, next) {
  res.render('inspirations', {});
});

/* GET goals page. */
router.get('/hasGoals', function(req, res, next) {
  res.render('goals', {});
});

module.exports = router;
