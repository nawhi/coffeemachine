import {CoffeeMachine} from "./CoffeeMachine";

export class Drink {
    constructor(public readonly type: DrinkType,
                public readonly sugars: number) {
    }


    withSugars(number: number) {
        return undefined;
    }
}

export class DrinkMaker {
    constructor(private machine: CoffeeMachine) {
    }

    make(drink: Drink) {
        this.machine.order(`T:${drink.sugars || ''}:${drink.sugars ? '0' : ''}`);
    }
}

export enum DrinkType {
    TEA
}

