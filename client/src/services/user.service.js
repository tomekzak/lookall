const host = 'http://localhost:5000';
export class UserService {
  constructor($http, $log, $localStorage) {
    'ngInject';
    this.$http = $http;
    this.$log = $log;
    this.$storage = $localStorage;
  }
  register(data) {
    const url = host + '/auth/register';
    return this.$http.post(
      url,
      data
    ).then(res => {
      this.$log.debug('add new user', res);
      return res;
    }, err => {
      return err;
    });
  }
  login(data) {
    const url = host + '/auth/login';
    return this.$http.post(
      url,
      data
    ).then(res => {
      this.$log.debug('login user', res);
      this.setToken(res.data.token);
      return res;
    }, err => {
      return err;
    });
  }
  setToken(token) {
    this.$storage.token = token;
  }
  getToken() {
    return this.$storage.token;
  }
}
