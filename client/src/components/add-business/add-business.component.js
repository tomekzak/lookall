import './add-business.scss';

export const addBusiness = {
  template: require('./add-business.html'),
  controller: class AddBusinessComponent {
    constructor($log, $mdToast, BusinessService) {
      'ngInject';
      this.$log = $log;
      this.businessService = BusinessService;
      this.$mdToast = $mdToast;

      this.business = {};
    }
    add() {
      this.$log.debug('business', this.business);
      this.businessService.add(this.business).then(res => {
        this.$log.debug('res', res);
        if (angular.isUndefined(res.data.error)) {
          this.$mdToast.show(
            this.$mdToast.simple()
              .textContent('Dodano wpis')
              .position('bottom')
              .hideDelay(3000)
          );
        }
      });
    }
  }
};
