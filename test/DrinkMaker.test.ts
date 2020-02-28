import {expect} from "chai";
import {CoffeeMachine} from "../src/CoffeeMachine";
import {DrinkMaker} from "../src/DrinkMaker";
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

describe('Drink Maker', () => {
    it('makes a tea', () => {
        const machine = new CoffeeMachineSpy();
        const drinkMaker = new DrinkMaker(machine);
        drinkMaker.make(DrinkBuilder.TEA.build());
        expect(machine.lastReceivedCommand()).to.eq('T::');
    });

    it('makes a tea with 1 sugar', () => {
        const machine = new CoffeeMachineSpy();
        const drinkMaker = new DrinkMaker(machine);
        drinkMaker.make(DrinkBuilder.TEA.sugars(1).build());
        expect(machine.lastReceivedCommand()).to.eq('T:1:');
    });
});
