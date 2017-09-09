import angular from 'angular';

import routesConfig from './routes';
import runApp from './run';

import {deps} from './deps/deps.module';
import {services} from './services/services.module';
import {components} from './components/components.module';

import './index.scss';

export const app = 'app';

angular
  .module(app, [
    deps,
    services,
    components
  ])
  .config(routesConfig)
  .run(runApp);
