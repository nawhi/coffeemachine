import {CoffeeMachine} from "./CoffeeMachine";

export class Drink {
    constructor(public readonly type: DrinkType) {
    }


}

export class DrinkMaker {
    constructor(private machine: CoffeeMachine) {
    }

    make(drink: Drink) {
        this.machine.order('T::');
    }
}

enum DrinkType {
    TEA
}

export class DrinkBuilder {
    static TEA = new Drink(DrinkType.TEA);
}
