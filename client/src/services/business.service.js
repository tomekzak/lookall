export class BusinessService {
  constructor($http, $log) {
    'ngInject';
    this.$http = $http;
    this.$log = $log;
  }
  getAll() {
    return this.$http.get('localhost:5000/business/all').then(response => this.$log('first fetch!', response.data));
  }
}
