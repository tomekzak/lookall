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
    })
    .state('app.main.detail', {
      url: '/:id',
      views: {
        'content@app': {
          component: 'business'
        }
      }
    });
}

