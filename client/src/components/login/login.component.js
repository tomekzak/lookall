import './login.scss';

export const login = {
  template: require('./login.html'),
  controller: class loginComponent {
    constructor($log, $mdToast, UserService) {
      'ngInject';
      this.$log = $log;
      this.userService = UserService;
      this.$mdToast = $mdToast;

      this.user = {};
    }
    login() {
      this.$log.debug('user', this.user);
      this.userService.login(this.user).then(res => {
        this.$log.debug('res', res);
        if (res.data.error === 'user_already_exists') {
          this.$mdToast.show(
            this.$mdToast.simple()
              .textContent('Nieprawidłowe dane')
              .position('bottom')
              .hideDelay(3000)
          );
        } else {
          this.$mdToast.show(
            this.$mdToast.simple()
              .textContent('Cześć!')
              .position('bottom')
              .hideDelay(2000)
          );
        }
      });
    }
  }
};
