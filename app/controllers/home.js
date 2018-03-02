const express = require('express'),
  router = express.Router();

module.exports = (app) => {
  app.use('/', router);
};

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {
    'title': "Multimedia designer & Front-end magician",
    pageName: 'landing',
  });
});

/* GET about page. */
router.get('/whoTheHell', (req, res, next) => {
  res.render('about', {
    'title': "Who the hell am I?",
    pageName: 'about',
  });
});

/* GET inspirations page. */
router.get('/isInspired', (req, res, next) => {
  res.render('inspirations', {
    'title': "What and who inspires me?",
    pageName: 'inspirations',
  });
});

/* GET goals page. */
router.get('/hasGoals', (req, res, next) => {
  res.render('goals', {
    'title': "Who do I aspire to be?",
    pageName: 'goals',
  });
});
