import { observer } from "mobx-react";
import React from "react";
import { makeObservable, observable, computed, autorun, action } from "mobx";
import mainStore from "../stores/MainStore";

class OrderLine {
  price = 0;
  amount = 1;

  constructor() {
    makeObservable(this, {
      price: observable,
      amount: observable,
      total: computed
    });
    console.log("From constructor .....................");
  }

  setPrice = action(value => (this.price = value));

  get total() {
    console.log("Computing...");
    return this.price * this.amount;
  }
}

class TestComponent extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      const order = new OrderLine();

      autorun(() => {
        console.log("Total: " + order.total);
      });
      // Computing...
      // Total: 0

      console.log(order.total);
      // (No recomputing!)
      // 0

      order.setPrice(5);
      // Computing...
      // (No autorun)

      order.setPrice(2);
      // Computing...
      // Total: 10

      //stop();

      order.setPrice(3);
    }, 2000);
  }

  render() {
    return <div className="statistics">TEST component: {mainStore.observable1}</div>;
  }
}

export default observer(TestComponent);
