export const hello = {
  template: require('./hello.html'),
  controller: class HelloComponent {
    constructor(
      $log,
      BusinessService
    ) {
      'ngInject';
      this.$log = $log;
      this.BusinessService = BusinessService;
    }

    $onInit() {
      this.BusinessService.getAll().then(res => {
        this.$log.debug('get all', res);
      });
    }
  }
};
