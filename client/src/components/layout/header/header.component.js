export const header = {
  template: require('./header.html'),
  controller: class HeaderComponent {
    constructor(
      $log, $state, $scope, $window
    ) {
      'ngInject';
      this.$log = $log;
      this.$state = $state;
      this.$scope = $scope;
      this.$window = $window;
      this.title = 'LookAll';
    }
    $onInit() {
      this.$scope.$on('header.change.back', (event, res) => {
        this.back = res;
      });
    }
    goBack() {
      this.$window.history.back();
    }
  }
};
