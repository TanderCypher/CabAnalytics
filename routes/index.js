var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index", {
    title: "CabAnalytics",
    analyseData: res.locals.soneTelling,
    turData: res.locals.turData,
  });
});

module.exports = router;
