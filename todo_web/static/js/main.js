var app = angular.module('todo',[
    'ui.router',
    'ngDraggable',
]);

app.constant('BASE_URL', 'http://localhost:8000/api/');
app.constant('LISTS_PATH', 'todo_lists/');
app.constant('ITEMS_PATH', 'todo_items/');

app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state("index", {
      url: "",
      templateUrl: '/static/templates/index.html',
      controller: 'MainController'
    });
});

app.controller('MainController', function ($scope, todoFactory, $state) {
  $scope.todo_lists = [];
  $scope.edit_mode = false;

  $scope.filterDone = function (items){
    return items.filter(function(i){ return i.done });
  };

  $scope.newTodoList = function () {
    var todo_list = {};
    todoFactory.list.add(todo_list).then(function(res){
      $scope.todo_lists.push(res.data);
    });
  };

  $scope.newTodoItem = function (todo_list) {
    var todo_item = { todo_list: todo_list.id };
    todoFactory.item.add(todo_item).then(function(res){
      todo_list.items.push(res.data);
    });
  };

  todoFactory.list.all().then(function(res){
    $scope.todo_lists = res.data;
  });
});

app.factory('todoFactory', function ($http, BASE_URL, LISTS_PATH, ITEMS_PATH) {
  var factory = {};

  var all = function(resourcePath){
    return function() { 
      return $http.get(BASE_URL + resourcePath) 
    };
  };

  var add = function(resourcePath){
    return function(element) { 
      return $http.post(BASE_URL + resourcePath, element) 
    };
  };

  var update = function(resourcePath){
    return function(element) { 
      return $http.put(BASE_URL + resourcePath + element.id, element) 
    };
  };

  var remove = function(resourcePath){
    return function(id) { 
      return $http.delete(BASE_URL + resourcePath + id) 
    };
  };

  factory.list = {
    all : all(LISTS_PATH),
    add : add(LISTS_PATH),
    update : update(LISTS_PATH),
    remove : remove(LISTS_PATH)
  };

  factory.item = {
    all : all(ITEMS_PATH),
    add : add(ITEMS_PATH),
    update : update(ITEMS_PATH),
    remove : remove(ITEMS_PATH)
  };

  return factory;
});
