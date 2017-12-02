/**
 * Created by daniel on 02/12/2017.
 */

let app = angular.module('myApp' ,['ngRote']);



app.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('');
}]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "./home/HomePage.html",
            controller: "HomePageController"
        })
        .otherwise({
            redirect: '/',
        });
}]);