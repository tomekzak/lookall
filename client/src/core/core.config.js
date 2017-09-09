export default coreConfig;

function coreConfig($httpProvider, AuthInterceptor) {
  'ngInject';
  $httpProvider.interceptors.push(AuthInterceptor);
}
