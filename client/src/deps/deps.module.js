import angular from 'angular';

import uirouter from 'angular-ui-router';
import angularAria from 'angular-aria';
import angularAnimate from 'angular-animate';
import angularMessages from 'angular-messages';
import angularMaterial from 'angular-material';

import depsConfig from './deps.config';

export const deps = 'app.deps';
angular
  .module(deps, [
    uirouter,
    angularAria,
    angularAnimate,
    angularMessages,
    angularMaterial
  ])
  .config(depsConfig);
