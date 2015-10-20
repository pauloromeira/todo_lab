var app = angular.module('todo',[
    'ui.router',
]);

app.constant('BASE_URL', '');

app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state("index", {
      url: "",
      templateUrl: '/static/templates/index.html',
      controller: 'MainController'
    });
});

app.controller('MainController', 
    function ($scope, LoginService, TodoService, $state) {
});

app.service('LoginService', function ($http, BASE_URL) {
});

app.service('TodoService', function ($http, BASE_URL) {
});
