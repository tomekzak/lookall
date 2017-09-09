import './hello.scss';

export const hello = {
  template: require('./hello.html'),
  controller: class HelloComponent {
    constructor($log, $state, BusinessService) {
      'ngInject';
      this.$log = $log;
      this.$state = $state;
      this.businessService = BusinessService;
    }
    $onInit() {
      this.hello = 'Hello World!';
      this.businesses = [];
      this.businessService.getAll().then(res => {
        this.businesses = res.data;
        let idx = 1;
        this.businesses = this.businesses.map(item => {
          if (idx > 5) {
            idx = 1;
          }
          item.image = idx;
          idx += 1;
          return item;
        });
      });
    }
    showDetails(id) {
      this.$log.debug('detail id', id);
      return this.$state.go('app.main.detail', {id});
    }
  }
};
