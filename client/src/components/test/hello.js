export const hello = {
  template: require('./hello.html'),
  controller() {
    this.imagePath = './../assets/cat.jpg';
    this.hello = 'Hello World!';
    this.todos = [
      {
        face: this.imagePath,
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: ' I\'ll be in your neighborhood doing errands'
      },
      {
        face: imagePath,
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: ' I\'ll be in your neighborhood doing errands'
      },
      {
        face: imagePath,
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: ' I\'ll be in your neighborhood doing errands'
      },
      {
        face: imagePath,
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: ' I\'ll be in your neighborhood doing errands'
      },
      {
        face: imagePath,
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: ' I\'ll be in your neighborhood doing errands'
      }
    ];
  }
};
