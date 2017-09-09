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
      url: 'business/:id',
      views: {
        'content@app': {
          component: 'business',
          bindings: {business: 'businessItem'}
        }
      },
      data: {
        back: true
      },
      resolve: {
        businessItem: ($log, $stateParams, BusinessService) => {
          return BusinessService.get($stateParams.id);
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

