import angular from 'angular';

import {BusinessService} from './business.service';
import {UserService} from './user.service';

export const services = 'app.services';
angular
  .module(services, [])
  .service('BusinessService', BusinessService)
  .service('UserService', UserService);

