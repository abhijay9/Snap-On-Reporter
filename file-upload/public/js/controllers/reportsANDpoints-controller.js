app.controller('appController', ['$scope', '$resource', function ($scope, $resource) {
  var ReportsAndPoints = $resource('/api/reportsAndPoints'); 
  var rImage = $resource('/api/rImages');
  var rdImage = $resource('/api/rdImages');
  

  ReportsAndPoints.query(function (results) {
    $scope.reports = results;
  });

  $scope.points = []

    
  $scope.fail = function (report) {
    var rimages = new rImage();
    rimages.img = report._id;
    rimages.flag = 0;
    rimages.description = report.description
    rimages.loc = report.loc;
    rimages.landmark = report.landmark;
    rimages.$save( function (err, result)
      {
        res.json(result);
      });

    var rimages = new rdImage();
    rimages.img = report._id;
    rimages.description = report.description
    rimages.loc = report.loc;
    rimages.landmark = report.landmark;
    rimages.$save( function (err, result)
      {
        res.json(result);
      });
   
  }

  $scope.pass = function(report) {
    var rimages = new rImage();
    rimages.img = report._id;
    rimages.flag = 1;
    rimages.description = report.description
    rimages.loc = report.loc;
    rimages.landmark = report.landmark;
    rimages.$save( function (err, result)
      {
        res.json(result);
      });
    var rpimages = new rdImage();
    rpimages.img = report._id;
    rpimages.description = report.description
    rpimages.loc = report.loc;
    rimages.landmark = report.landmark;
    rpimages.$save( function (err, result)
      {
        res.json(result);
      });
  }
  $scope.createPoints = function () {
    $scope.lines = [];
  }
}]);