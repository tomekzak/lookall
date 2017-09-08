export class BusinessService {
<<<<<<< HEAD
  constructor($http, $log) {
    'ngInject';
    this.$http = $http;
    this.$log = $log;
  }
  getAll() {
    return this.$http.get('localhost:5000/business/all').then(response => this.$log('first fetch!', response.data));
  }
}
=======
  constructor($http) {
    'ngInject';
    this.$http = $http;
  }
  getAllBusinesses() {
    return this.$http.get('/api/allBusinesses').then(response => response.data);
  }
}
>>>>>>> 129ff63a7b8dd673001abecfa6ed97bd9662773c
