var rImage_model = require('../models/reports');

module.exports.del = function(req , res){
	rImage_model.remove({ _id: req.body.img }, function (err, result) {
		res.json(result);
	});

}
