import angular from 'angular';

import {authInterceptor} from './interceptor.service';

export const interceptors = 'app.core.interceptors';
angular
  .module(interceptors, [])
  .service('AuthInterceptor', authInterceptor);
