import angular from 'angular';

import uirouter from 'angular-ui-router';

import depsConfig from './deps.config';

export const deps = 'app.deps';
angular
  .module(deps, [
    uirouter
  ])
  .config(depsConfig);
