import '@uirouter/angularjs'
import * as angular from 'angular'
import userdive from 'userdive'
import Sample1 from './controllers/sample1'
import Sample2 from './controllers/sample2'

const _ud = userdive()
const main = angular.module('myapp', ['ui.router'])

main.config([
  '$stateProvider',
  '$urlRouterProvider',
  ($stateProvider: any, $urlRouterProvider: any) => {
    $urlRouterProvider.otherwise('/sample1')

    $stateProvider
      .state('sample1', {
        url: '/sample1',
        templateUrl: 'sample1.html',
        controller: 'sample1Controller',
        controllerAs: 'c'
      })
      .state('sample2', {
        url: '/sample2',
        templateUrl: 'sample2.html',
        controller: 'sample2Controller',
        controllerAs: 'c'
      })
  }
])

main.controller('sample1Controller', Sample1)
main.controller('sample2Controller', Sample2)
main.controller('create', [
  '$scope',
  $scope => {
    $scope.$on('viewContentLoaded', () => {
      _ud('create', 'af57h6gb', 'auto')
    })
  }
])

main.run([
  '$rootScope',
  '$location',
  ($rootScope: any, $location: any) => {
    $rootScope.$on('$stateChangeSuccess', () => {
      _ud('send', 'pageview', $location.absUrl())
    })
  }
])
