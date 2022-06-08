import { observable, action, configure, makeObservable, computed } from "mobx";

configure({
  enforceActions: "always"
});

class MainStore {
  observable1 = "";
  observable2 = "";

  constructor() {
    makeObservable(this, {
      observable1: observable,
      observable2: observable,
      setObservable1: action
    });
  }

  setObservable1 = action((value: string) => {
    console.log("Observable changed to:", value);
    this.observable1 = value;
  });

  autorun() {
    console.log("Autorun executed");
  }
}

const mainStore = new MainStore();
export default mainStore;
