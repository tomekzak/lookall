import angular from 'angular';

import {hello} from './app/hello';
import routesConfig from './routes';

import {deps} from './deps/deps.module.js';
import {services} from './services/services.module.js';

import './index.scss';

export const app = 'app';

angular
  .module(app, [
    deps,
    services
  ])
  .config(routesConfig)
  .component('app', hello);
