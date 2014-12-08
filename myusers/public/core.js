// public/core.js

var myUsers = angular.module('myUsers', []);

myUsers.controller('mainController', ['$scope', '$http', function($scope, $http) {

//function mainController($scope, $http) {
	$scope.formData = {};

	// when arriving at the page, get all users and show them
	$http.get('/api/users')
		.success(function(data) {
			$scope.users = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	// when submitting the form, send info to the API
	$scope.createUser = function() {
		$http.post('/api/users', $scope.formData)
			.success(function(data) {
				// clear the form so another user could be added
				$scope.formData = {};
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	// delete a user on request
	$scope.deleteUser = function(id) {
		$http.delete('/api/users/' + id)
			.success(function(data) {
				$scope.users = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
}])