var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/nord', function(req, res, next) {
  res.send('respond with a nord cat');
});
module.exports = router;
