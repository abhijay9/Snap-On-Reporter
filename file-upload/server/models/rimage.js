var mongoose = require ('mongoose');

module.exports = mongoose.model ('moderatedImages',
	{
  	img: String,
    description: String,
    landmark: String,
    flag: Number,
    loc: {
    	longitude: String,
    	latitude: String,
    	latitude_reference: String,
    	longitude_reference: String
    }
	});