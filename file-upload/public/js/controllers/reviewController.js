app.controller('reviewController', ['$scope', '$resource', function ($scope, $resource) {

	var rImage = $resource('/api/rImages');

	rImage.query(function (results) {
    $scope.reports = results;
  });

	var rrImage = $resource('/api/rrImages');

	$scope.change = function (report) {
    var rimages = new rrImage();
    rimages.img = report.img;
    rimages.flag = report.flag;
    rimages.description = report.description;
    rimages.loc = report.loc; 
    rimages.landmark = report.landmark;
    rimages.$save( function (err, result)
      {
        res.json(result);
      });
  }
  $scope.statex = function(flag)
  {
    if (flag == 1)
      return true;
    else
      return false;
  }
  $scope.statey = function(flag)
  {
    if (flag == 1)
      return false;
    else
      return true;
  }
  }]);
