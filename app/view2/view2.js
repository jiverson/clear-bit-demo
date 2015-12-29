'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', '$http', function($scope, $http) {
  $scope.getCompany = function() {

    $http
        .get('https://person.clearbit.com/v1/people/email/<SOME EMAIL HERE>',
            {
              headers: {Authorization: ' Bearer <AUTH KEY HERE>'}
            })
        .then(function(response) {
          $scope.companyInfo = response.data;
        });

  };
}]);