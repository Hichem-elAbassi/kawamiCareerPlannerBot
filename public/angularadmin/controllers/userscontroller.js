var app = angular.module('bot.controllers', ['ngTable']);

app.controller('UsersListCtrl', ['$scope', 'UsersFactory', 'UserFactory', '$location','NgTableParams','$route',
    function ($scope, UsersFactory, UserFactory, $location,NgTableParams,$route) {


        // callback for ng-click 'editUser':
        $scope.editUser = function (userId) {
            $location.path('/user-detail/' + userId);
        };

        // callback for ng-click 'deleteUser':
        $scope.deleteUser = function (userId) {
            UserFactory.delete({ id: userId });
            $scope.users = UsersFactory.query();
            $route.reload();
        };

        // callback for ng-click 'createUser':
        $scope.createNewUser = function () {
            $location.path('/user-creation');
        };

        UsersFactory.query().$promise.then(function (data) {
            $scope.users = data;
            $scope.tableParams = new NgTableParams({}, { dataset: $scope.users});
        });


    }]);

app.controller('UserDetailCtrl', ['$scope', '$routeParams', 'UserFactory', '$location','UserFactory','$rootScope',
    function ($scope, $routeParams, UserFactory, $location,UsersFactory,$rootScope) {

        // callback for ng-click 'updateUser':
        $scope.updateUser = function () {
            console.log($scope.user);
            UsersFactory.update($scope.user);
            $location.path('/user-list');
        };

        // callback for ng-click 'cancel':
        $scope.cancel = function () {
            $location.path('/user-list');
        };

        $scope.user = UserFactory.show({id: $routeParams.id});
    }]);

app.controller('UserCreationCtrl', ['$scope', 'UsersFactory', '$location','$rootScope',
    function ($scope, UsersFactory, $location,$rootScope) {

        // callback for ng-click 'createNewUser':
        $scope.createNewUser = function () {
            UsersFactory.create($scope.user);
            $location.path('/user-list');
        }
    }]);