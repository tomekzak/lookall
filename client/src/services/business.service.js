export class BusinessService {
  constructor($http) {
    'ngInject';
    this.$http = $http;
  }
  getAllBusinesses() {
    return this.$http.get('/api/allBusinesses').then(response => response.data);
  }
}