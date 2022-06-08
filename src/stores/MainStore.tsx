import { observable, action, configure, makeObservable, computed } from "mobx";

configure({
  enforceActions: "always",
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true
});

export class MainStore {
  constructor() {
    makeObservable(this, {});
  }
}

const mainStore = new MainStore();
export default mainStore;
