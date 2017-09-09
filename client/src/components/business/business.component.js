import './business.scss';

export const business = {
  template: require('./business.html'),
  controller: class BusinessComponent {
    constructor($log) {
      'ngInject';
      this.$log = $log;
    }
  }
};
