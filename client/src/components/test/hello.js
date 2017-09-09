import './hello.scss';

export const hello = {
  template: require('./hello.html'),
  controller: class HelloComponent {
    constructor($log, BusinessService) {
      'ngInject';
      this.$log = $log;
      this.businessService = BusinessService;
    }
    $onInit() {
      this.hello = 'Hello World!';
      this.businesses = [];
      this.businessService.getAll().then(res => {
        this.businesses = res.data;
      });
    }
  }
};
