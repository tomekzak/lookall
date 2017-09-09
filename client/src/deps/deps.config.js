export default depsConfig;

function depsConfig($mdThemingProvider) {
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
}
