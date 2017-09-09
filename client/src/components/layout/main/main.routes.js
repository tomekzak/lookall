export default mainRoutes;

/** @ngInject */
function mainRoutes($stateProvider) {
  $stateProvider
    .state('app.main', {
      url: '/',
      views: {
        'content@app': {
          component: 'hello'
        }
      }
    });
}

