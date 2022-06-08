import { observable, action, configure, makeObservable, computed } from "mobx";

configure({
  enforceActions: "always"
});

class MainStore {
  observable1 = "";
  observable2 = "";

  price = 0;
  amount = 1;

  setPrice = action(value => (this.price = value));

  get total() {
    console.log("Computing...");
    return this.price * this.amount;
  }
  constructor() {
    makeObservable(this, {
      observable1: observable,
      observable2: observable,
      setObservable1: action,
      price: observable,
      amount: observable,
      total: computed
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
