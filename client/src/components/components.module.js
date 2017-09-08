import angular from 'angular';

import {hello} from './test/hello';

export const components = 'app.components';
angular
  .module(components, [])
  .component('hello', hello);
