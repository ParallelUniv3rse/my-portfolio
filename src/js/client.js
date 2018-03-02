import Rippler from './components/Rippler';

class Client {
// eslint-disable-next-line no-useless-constructor,no-empty-function
  constructor() {
    this.init();
  }

  init() {
    this.initRippler();
  }

  initRippler() {
    this.rippler = new Rippler();
  }
}

// eslint-disable-next-line no-unused-vars
const instance = new Client();
