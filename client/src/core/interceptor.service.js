export class authInterceptor {
  constructor($log, UserService) {
    'ngInject';
    this.$log = $log;
    this.userService = UserService;
  }
  request(config) {
    this.$log.debug('config', config, this.userService.getToken());
    return config;
  }
}
