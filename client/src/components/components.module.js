import angular from 'angular';

import {main} from './layout/main/main.component';
import {header} from './layout/header/header.component';
import {hello} from './hello/hello';
import {business} from './business/business.component';
<<<<<<< HEAD
import {register} from './register/register.component';
import {login} from './login/login.component';
=======
>>>>>>> 4bc24a121a887d803cd66b236692025496f1c055

import mainRoutes from './layout/main/main.routes.js';

export const components = 'app.components';
angular
  .module(components, [])
  .component('hello', hello)
  .component('business', business)
  .component('appMain', main)
  .component('appHeader', header)
<<<<<<< HEAD
  .component('register', register)
  .component('login', login)
=======
>>>>>>> 4bc24a121a887d803cd66b236692025496f1c055
  .config(mainRoutes);
