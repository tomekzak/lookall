import angular from 'angular';

import uirouter from 'angular-ui-router';

export const deps = 'app.deps';
angular
  .module(deps, [
    uirouter
  ]);
