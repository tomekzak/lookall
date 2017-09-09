import angular from 'angular';

import {main} from './layout/main/main.component';
import {header} from './layout/header/header.component';
import {hello} from './hello/hello';
import {business} from './business/business.component';
import {register} from './register/register.component';

import mainRoutes from './layout/main/main.routes.js';

export const components = 'app.components';
angular
  .module(components, [])
  .component('hello', hello)
  .component('business', business)
  .component('appMain', main)
  .component('appHeader', header)
  .component('register', register)
  .config(mainRoutes);
