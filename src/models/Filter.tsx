import "raf/polyfill";
import { action, configure, makeObservable, observable } from "mobx";
configure({ enforceActions: "always" });

export default class Filter {
  minValue = "";
  maxValue = "";
  pattern = "";
  mode;

  constructor(minValue = "", maxValue = "", pattern = "") {
    makeObservable(this, {
      minValue: observable,
      maxValue: observable,
      pattern: observable,
      setValues: action,
      setMode: action
    });
    this.setValues(minValue, maxValue, pattern);
    this.mode = "range";
  }

  setValues = (minValue, maxValue, pattern) => {
    if (minValue !== "") {
      this.minValue = minValue;
    }
    if (maxValue !== "") {
      this.maxValue = maxValue;
    }
    if (pattern !== "") {
      this.pattern = pattern;
    }
  };

  setMode = mode => (this.mode = mode);
}
