var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'CabAnalytics', turData: req.turData});
});

module.exports = router;
