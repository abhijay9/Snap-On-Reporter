var mongoose = require('mongoose');

module.exports = mongoose.model('points', {
    _id: String,
    pnts: Number
});
