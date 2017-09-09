export class BusinessService {
  constructor($http, $log) {
    'ngInject';
    this.$http = $http;
    this.$log = $log;
  }
  getAll() {
    return this.$http.get('http://localhost:5000/business/all').then(response => {
      this.$log.debug('first fetch!', response);
      return response;
    });
  }
}
