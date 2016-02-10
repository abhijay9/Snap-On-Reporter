var mongoose = require('mongoose');

module.exports = mongoose.model('reports', {
  	_id: String,
    description: String,
    landmark: String,
    loc: {
    	longitude: String,
    	latitude: String,
    	latitude_reference: String,
    	longitude_reference: String
    }
});