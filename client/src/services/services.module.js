import angular from 'angular';

import {BusinessService} from './business.service';

export const services = 'app.services';
angular
  .module(services, [])
  .service('BusinessService', BusinessService);

