import './business.scss';

export const business = {
  bindings: {
    businessItem: '<'
  },
  template: require('./business.html'),
  controller: class BusinessComponent {
    constructor($log, $state) {
      'ngInject';
      this.$log = $log;
      this.$state = $state;
      this.rate = 0;
    }
    $onChange(changes) {
      this.$log.debug('changes', changes);
      if (changes.businessItem) {
        this.businessItem = Object.assign({}, this.businessItem);
      }
    }
    $onInit() {
      if (this.businessItem.rates.length > 0) {
        const rates = this.businessItem.rates;
        this.rate = rates.reduce((prev, next) => prev.rate + next.rate) / rates.length;
      }
    }
  }
};
