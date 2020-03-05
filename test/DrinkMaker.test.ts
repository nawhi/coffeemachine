import { expect } from "chai";
import { CoffeeMachine } from "../src/CoffeeMachine";
import { DrinkMaker } from "../src/DrinkMaker";
import * as DrinkBuilder from "./DrinkBuilder";

class CoffeeMachineSpy implements CoffeeMachine {
  private commands: string[] = [];

  order(command: string) {
    this.commands.push(command);
  }

  lastReceivedCommand() {
    return this.commands[this.commands.length - 1];
  }
}

describe("Drink Maker", () => {
  const tea = DrinkBuilder.TEA.build();

  describe("drink types", () => {
    it("makes a tea for 0,4 euro", () => {
      const machine = new CoffeeMachineSpy();
      const drinkMaker = new DrinkMaker(machine);
      drinkMaker.make(tea, 40);
      expect(machine.lastReceivedCommand()).to.eq("T::");
    });

    it("makes a coffee for 0,6 euro", () => {
      const machine = new CoffeeMachineSpy();
      const drinkMaker = new DrinkMaker(machine);
      drinkMaker.make(DrinkBuilder.COFFEE.build(), 60);
      expect(machine.lastReceivedCommand()).to.eq("C::");
    });

    it("makes a hot chocolate for 0,5 euro", () => {
      const machine = new CoffeeMachineSpy();
      const drinkMaker = new DrinkMaker(machine);
      drinkMaker.make(DrinkBuilder.CHOCOLATE.build(), 50);
      expect(machine.lastReceivedCommand()).to.eq("H::");
    });
  });

  describe("payment", () => {
    it("makes a drink if paid more than its cost", () => {
      const machine = new CoffeeMachineSpy();
      const drinkMaker = new DrinkMaker(machine);
      drinkMaker.make(tea, 90);
      expect(machine.lastReceivedCommand()).to.eq("T::");
    });

    it("sends a message containing the difference if funds are insufficient", () => {
      const machine = new CoffeeMachineSpy();
      const drinkMaker = new DrinkMaker(machine);
      drinkMaker.make(tea, 30);
      const command = machine.lastReceivedCommand();
      expect(command).to.match(/^M:/);
      expect(command).to.contain("10¢");
    });
  });

  describe("sugars and stick combinations", () => {
    it("makes a tea with 1 sugar and a stick", () => {
      const machine = new CoffeeMachineSpy();
      const drinkMaker = new DrinkMaker(machine);
      drinkMaker.make(DrinkBuilder.TEA.sugars(1).build(), 40);
      expect(machine.lastReceivedCommand()).to.eq("T:1:0");
    });

    it("makes a coffee with 2 sugars and a stick", () => {
      const machine = new CoffeeMachineSpy();
      const drinkMaker = new DrinkMaker(machine);
      drinkMaker.make(DrinkBuilder.COFFEE.sugars(2).build(), 60);
      expect(machine.lastReceivedCommand()).to.eq("C:2:0");
    });
  });
});
