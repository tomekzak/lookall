import angular from 'angular';

import {main} from './layout/main/main.component';
import {header} from './layout/header/header.component';
import {hello} from './test/hello';

import mainRoutes from './layout/main/main.routes.js';

export const components = 'app.components';
angular
  .module(components, [])
  .component('appMain', main)
  .component('appHeader', header)
  .component('hello', hello)
  .config(mainRoutes);
