var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");


var refresh = function() {
  $http.get('/myproject').success(function(response) {
    console.log("I got the data I requested");
    $scope.myproject = response;
    $scope.contact = "";
  });
};

refresh();

$scope.addContact = function() {
  console.log($scope.contact);
  $http.post('/myproject', $scope.contact).success(function(response) {
    console.log(response);
    refresh();
  });
};


}]);