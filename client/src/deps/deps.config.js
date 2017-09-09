export default depsConfig;

function depsConfig($mdThemingProvider, $httpProvider) {
  'ngInject';

  $mdThemingProvider.theme('default')
    .primaryPalette('orange', {
      default: '700',
      'hue-1': '100',
      'hue-2': '600',
      'hue-3': 'A100'
    })
    .accentPalette('orange', {
      default: '100'
    });
  $httpProvider.interceptors.push(($log, $localStorage) => {
    return {
      request: config => {
        $log.debug('config', $localStorage.token);
        if ($localStorage.token) {
          config.headers.Authorization = 'Bearer ' + $localStorage.token;
        }
        return config;
      }
    };
  });
}
