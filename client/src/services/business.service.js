const url = 'http://localhost:5000';
export class BusinessService {
  constructor($http, $log) {
    'ngInject';
    this.$http = $http;
    this.$log = $log;
  }
  getAll() {
    return this.$http.get(url + '/business/all').then(response => {
      this.$log.debug('first fetch!', response);
      return response;
    });
  }
  upvote(id) {
    return this.$http.post(url + '/business/upvote', {id});
  }
  downvote(id) {
    return this.$http.post(url + '/business/downvote', {id});
  }
}
