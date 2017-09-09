import angular from 'angular';

import {interceptors} from './interceptors/interceptors.module';

import coreConfig from './core.config';

export const core = 'app.core';
angular
  .module(core, [
    interceptors
  ])
  .config(coreConfig);
