export default depsConfig;

function depsConfig($mdThemingProvider) {
  'ngInject';

  $mdThemingProvider.theme('default')
    .primaryPalette('pink')
    .accentPalette('orange');
}
