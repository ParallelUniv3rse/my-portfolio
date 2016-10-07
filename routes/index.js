var express = require('express');
var router = express.Router();
var path = require('path');
var indexModel = require(path.join(__dirname, "../models/index.js"));
/* GET home page. */
console.log(indexModel.getIndexData("Express"));
router.get('/', function(req, res, next) {
  res.render('index', indexModel.getIndexData("Express"));
});

module.exports = router;
