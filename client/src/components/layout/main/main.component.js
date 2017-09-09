export const main = {
  template: require('./main.html'),
  controller: class MainComponent {
    constructor(
      $log
    ) {
      'ngInject';
      this.$log = $log;
    }
  }
};
