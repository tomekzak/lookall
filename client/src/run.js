export default runApp;

/** @ngInject */
function runApp($transitions, $log, $rootScope) {
  $transitions.onStart({to: '**'}, trans => {
    trans.promise.then(res => {
      $rootScope.$broadcast('header.change.back', res.data.back);
    });
  });
}
