// public/core.js

var myUsers = angular.module('myUsers', []);

myUsers.controller('mainController', ['$scope', '$http', function($scope, $http) {

//function mainController($scope, $http) {
	$scope.formData = {};
	$scope.updateData = {};
	$scope.showList = true;
	$scope.showCreate = false;
	$scope.slclass = "active";

	// when arriving at the page, get all users and show them
	$http.get('/api/users')
		.success(function(data) {
			$scope.users = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Get error: ' + data);
		});

	// when submitting the form, send info to the API
	$scope.createUser = function() {

		if ($scope.createform.$valid) {

			$http.post('/api/users', $scope.formData)
				.success(function(data) {
					// clear the form so another user could be added
					$scope.formData = {};
					// update user data
					$scope.users = data;
					// reset the form submitted status
					$scope.createform.$submitted = false;
					// log data to console
					console.log(data);
				})
				.error(function(data) {
					console.log('Create error: ' + data);
				});


		};

	};

	// delete a user on request
	$scope.deleteUser = function(id) {
		$http.delete('/api/users/' + id)
			.success(function(data) {
				$scope.users = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Delete error: ' + data);
			});
	};
	$scope.updateUser = function(id) {
		$http.post('/api/users/' + id, $scope.updateData)
			.success(function(data) {
				// clear the update form
				$scope.updateData = {};
				// refresh user list
				$scope.users = data;
				// log to console
				console.log(data);
			})
			.error(function(data) {
				console.log('Update error: ' + data);
			});
	};
	$scope.editUser = function(user, userid) {
		
		$scope.updateData = {
			'email' : user.email,
			'first_name' : user.first_name,
			'last_name'	: user.last_name
		};
		
	}
	$scope.changeTab = function(tab_id) {
		console.log(tab_id);
		if (tab_id === "cutab") {
			
			// show the current users tab
			// make the tab have active class
			// make all others non-active
			// hide other tabs
			$scope.showList = false;
			$scope.showFeatures = false;
			$scope.showCreate = true;
			$scope.sfclass = "";
			$scope.slclass = "";
			$scope.cuclass = "active";

		} else if (tab_id === "sltab") {

			// show the user list tab
			// make the tab have active class
			// make all others non-active
			// hide other tabs
			$scope.showFeatures = false;
			$scope.showCreate = false;
			$scope.showList = true;
			$scope.sfclass = "";
			$scope.cuclass = "";
			$scope.slclass = "active";

		} else if (tab_id === "sftab") {

			// sho the features tab
			// make the tab have active class
			// make all others non-active
			// hide other tabs
			$scope.showList = false;
			$scope.showCreate = false;
			$scope.showFeatures = true;
			$scope.slclass = "";
			$scope.cuclass = "";
			$scope.sfclass = "active";

		}
		
	}
}])