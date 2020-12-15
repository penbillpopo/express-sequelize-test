var express = require('express');
var router = express.Router();
var model = require('../model')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
  model
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
     console.error('Unable to connect to the database:', err);
  });
});

module.exports = router;
