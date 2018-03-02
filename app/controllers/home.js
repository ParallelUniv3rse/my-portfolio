const express = require('express'),
  router = express.Router();

module.exports = (app) => {
  app.locals.noHover = false;
  app.use('/', router);
};

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Front-end UI developer',
    noHover: true,
  });
});

/* GET about page. */
router.get('/whoTheHell', (req, res, next) => {
  res.render('about', {
    title: 'Who the hell am I?',
  });
});

/* GET inspirations page. */
router.get('/isInspired', (req, res, next) => {
  res.render('inspirations', {
    title: 'What and who inspires me?',
  });
});

/* GET goals page. */
router.get('/hasGoals', (req, res, next) => {
  res.render('goals', {
    title: 'Who do I aspire to be?',
  });
});
