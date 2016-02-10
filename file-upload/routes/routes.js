
var fs = require('fs');
var mongoose= require('mongoose');


module.exports = function(app) {


mongoose.connect('mongodb://localhost/sorDB');
//get report id from timestamp from app

var reports_model = require('../server/models/reports');
var points_model = require('../server/models/points');

app.post('/upload', function(req, res) {

console.log(req.param('image_desc'));
console.log(req.param('email'));
console.log(req.param('email')+'_'+req.param('timestmp')+"_"+req.param('imageSerial'));

var email= req.param('email');
var reportId= email+'_'+req.param('timestmp'); 
var imgName= email+'_'+req.param('timestmp')+"_"+req.param('imageSerial');
var imgDesc= req.param('image_desc');
var latitude= req.param('lattitude');
var longitude= req.param('longitude');
var latitude_reference= req.param('lattituder');
var longitude_reference= req.param('longituder');
var landmarkDesc= req.param('landmark_desc');
console.log(latitude);
console.log(latitude_reference);

	fs.readFile(req.files.image.path, function (err, data){
	
		var dirname = "C:/node/file-upload/public";
		var newPath = dirname + "/images/" + imgName+'.jpg';
	
		fs.writeFile(newPath, data, function (err) {
			if(err){
				res.json({'response':"Error"});
			}
			else {

					new reports_model({
		    			_id: imgName,
    					report_id: reportId,
    					description: imgDesc,
    					landmark: landmarkDesc,
    					loc: {
    						longitude: longitude,
    						latitude: latitude,
    						latitude_reference: latitude_reference,
    						longitude_reference: longitude_reference
    					}
					}).save(function(err, doc){
   					
   					if(err) res.json(err);
					else {
				
						points_model.findOne( {_id : email}, function(err, docs) {
    					
    						if( err || !docs) {
	        					console.log("No user found");
    						} 
    						else {

    							console.log("user found");
    					  		//return docs;	
								//doc.n = 'jason borne';
  								//doc.visits.$inc();
  								docs.pnts= docs.pnts+10;
  								docs.save();
  								console.log(docs.pnts);
								res.json({'response':"Saved",'score': ""+docs.pnts});
								/*reports_model({
			    					_id: imgName,
		    						pnts: 
    					
								}).save(function(err, doc){
   					
   								if(err) res.json(err);
								else 
								});
								*/
							}

						});
				   	}
				});
			}
		});
	});
});


////////////////////////////////////////////////////

app.get('/',function(req,res){
	res.end("Node-File-Upload");

});

/////////////////////////////////////////////////////

var registration_schema = new mongoose.Schema({
    _id: String,
    username: String
});

var registration_model = mongoose.model('registration',registration_schema);

app.post('/register', function(req, res) {
	
	console.log(req.body);
	console.log(req.body.username);

	
	registration_model.findOne( {_id : req.body.email}, function(err, docs) {
    					
    if( err ) {
    	//console.log(" User with email Id Exists");
		res.json(err);
    } 
    else if(docs) { 
    	res.json({'response':'email Id already exists in database'});
    	//console.log(" User with email Id Exists"); 
	}
    else if(!docs){
	
	new registration_model({

		_id: req.body.email,
		username: req.body.username

	}).save(function(err, doc){
   	if(err) res.json(err);
	else {
		new points_model({
		    			_id: req.body.email,
    					pnts: 0
					}).save(function(err, doc){
   					
   					if(err) res.json(err);
					else res.json({'response':"Registration Complete"});
				});
		}
	});   

	}
	}); 
});
///////////////////////////////////////////////////////////////////////////////
/*
query.or([{ color: 'red' }, { status: 'emergency' }])

query.$where('this.comments.length === 10 || this.name.length === 5')

// or

query.$where(function () {
  return this.comments.length === 10 || this.name.length === 5;
})
*/
////////////////////////////////////////////////////////////////////////////////
app.get('/upload/:file', function (req, res){
		file = req.params.file;
		var dirname = "C:/node/file-upload";
		var img = fs.readFileSync(dirname + "/upload/" + file);
		res.writeHead(200, {'Content-Type': 'image/jpg' });
		res.end(img, 'binary');

});

//app.get('/api/someUrl', todos.query);
/*
app.get('/getReports', function (req, res){
	
	reports_model.find( function(err, docs) {
    					
    if( err ) {
    	//console.log(" User with email Id Exists");
		res.json(err);
    } 
    else if(docs) { res.json(docs)};

});
});
*/

};



