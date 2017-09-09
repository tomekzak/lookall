import './register.scss';

export const register = {
  template: require('./register.html'),
  controller: class RegisterComponent {
    constructor($log) {
      'ngInject';
      this.$log = $log;
    }
  }
};
