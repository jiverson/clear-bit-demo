'use strict';

angular.module('myApp.view1', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/view1', {
			templateUrl: 'view1/view1.html',
			controller: 'View1Ctrl'
		});
	}])

	.controller('View1Ctrl', ['$scope', '$http', function($scope, $http) {

		$scope.getCompany = function(value) {
			$scope.error = null;

			$http
				.get('https://person.clearbit.com/v1/people/email/' + value,
					{
						headers: {Authorization: ' Bearer <AUTH KEY HERE>'}
					})
				.then(function(response) {
					$scope.companyInfo = response.data;
				}, function(error) {
					$scope.error = error;
				});

		};

		$scope.email = {
			text: ''
		};

		$scope.user = {};

		var pending = false;

		$scope.$watch('user.name', function(value) {
			if(!value) {
				$scope.user.companyList = [];
				return;
			}
			if(pending)
				return;

			pending = true;

			$http.get('https://autocomplete.clearbit.com/v1/companies/suggest?query=' + value,
				{
					headers: {Authorization: ' Bearer <AUTH KEY HERE>'}
				})
			.then(function(response) {
				$scope.user.companyList = response.data;
				pending = false;
			});
		});

		$scope.data = {
			repeatSelect: null,
			availableOptions: [
				{id: '1', name: 'Option A'},
				{id: '2', name: 'Option B'},
				{id: '3', name: 'Option C'}
			]
		};



	}]);