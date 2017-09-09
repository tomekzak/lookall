export const header = {
  template: require('./header.html'),
  controller: class HeaderComponent {
    constructor(
      $log
    ) {
      'ngInject';
      this.$log = $log;
      this.title = 'LookAll';
    }
  }
};
