import {expect} from "chai";
import {CoffeeMachine} from "../src/CoffeeMachine";
import {DrinkBuilder, DrinkMaker} from "../src/DrinkMaker";

class CoffeeMachineSpy implements CoffeeMachine {
    private commands: string[] = [];

    order(command: string) {
        this.commands.push(command);
    }

    lastReceivedCommand() {
        return this.commands[this.commands.length - 1];
    }

}

describe('Coffee Machine', () => {
    it('makes a tea', () => {
        const machine = new CoffeeMachineSpy();

        const drinkMaker = new DrinkMaker(machine);
        drinkMaker.make(DrinkBuilder.TEA);
        expect(machine.lastReceivedCommand()).to.eq('T::');
    });
});
