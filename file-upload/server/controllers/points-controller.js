var reports_model = require('../models/reports');
var points_model = require('../models/points');

module.exports.list = function (req, res) {

  reports_model.find({}, function (err, results) {
    res.json(results);
  });
}
module.exports.create = function (req, res) {
  var points = new points_model(req.body);
  points.save(function (err, result) {
    res.json(result);
  });
}