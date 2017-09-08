import angular from 'angular';

import {hello} from './app/hello';
import routesConfig from './routes';

import {deps} from './deps/deps.module.js';

import './index.scss';

export const app = 'app';

angular
  .module(app, [
    deps
  ])
  .config(routesConfig)
  .component('app', hello);
