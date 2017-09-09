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
    })
    .state('app.main.register', {
      url: 'register',
      views: {
        'content@app': {
          component: 'register'
        }
      },
      data: {
        back: true
      }
    })
    .state('app.main.login', {
      url: 'login',
      views: {
        'content@app': {
          component: 'login'
        }
      },
      data: {
        back: true
      }
    });
}

