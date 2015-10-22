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
  $scope.lists = [];
  $scope.editMode = false;

  $scope.filterDone = function (items){
    return items.filter(function(i){ return i.done });
  };

  $scope.newList = function () {
    var list = {};
    todoFactory.list.add(list).then(function(res){
      $scope.lists.push(res.data);
    });
  };

  $scope.updateList = function(list) {
    todoFactory.list.update(list);
  };

  $scope.newItem = function (list) {
    var item = { todo_list: list.id };
    todoFactory.item.add(item).then(function(res){
      list.items.push(res.data);
    });
  };

  $scope.updateItem = function(item) {
    todoFactory.item.update(item);
  };

  todoFactory.list.all().then(function(res){
    $scope.lists = res.data;
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
    return function(object) { 
      return $http.post(BASE_URL + resourcePath, object) 
    };
  };

  var update = function(resourcePath){
    return function(object) { 
      return $http.put(BASE_URL + resourcePath + object.id, object) 
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
