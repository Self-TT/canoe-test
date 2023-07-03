var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('company/index', );
});

router.get('/company', function(req, res, next) {
  res.render('company/index', );
});

router.get('/manager', function(req, res, next) {
  res.render('manager/index', );
});

router.get('/fund', function(req, res, next) {
  res.render('fund/index', );
});

router.get('/investment', function(req, res, next) {
  res.render('investment/index', );
});


module.exports = router;
