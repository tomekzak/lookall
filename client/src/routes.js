export default routesConfig;

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('app', {
      abstract: true,
      views: {
        '': {
          component: 'appMain'
        }
      },
      data: {
        back: false
      }
    });
}
