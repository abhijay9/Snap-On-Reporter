var rImage_model = require('../models/rimage');

module.exports.create = function(req , res){
	var rImages = new rImage_model(req.body);
	rImages.save(function (err, result) {
		res.json(result);
	});
}
module.exports.list = function (req, res) {
  rImage_model.find({}, function (err, results) {
    res.json(results);
  });
 }
module.exports.update = function (req, res)
{
		console.log(req.body.flag);
	rImage_model.findOne( {img: req.body.img}, function (err, results){
			if (results.flag == 0)
			{
				results.flag = 1;
			}
				
			else
			{
				results.flag = 0;
			}
			results.save();
	});
}


