class LoadingManager {
  instance = undefined;

  constructor() {
    this.setInstance = this.setInstance.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  setInstance(instances) {
    this.instance = instances;
  }

  show() {
    if (this.instance) {
      this.instance.show();
    }
  }

  hide() {
    if (this.instance) {
      this.instance.hide();
    }
  }
}

export default new LoadingManager();
