import {CoffeeMachine} from "./CoffeeMachine";

type Cents = number;

export class Drink {
    constructor(public readonly type: DrinkType,
                public readonly sugars: number) {
    }


    withSugars(number: number) {
        return undefined;
    }
}
export enum DrinkType {
    HOT_CHOCOLATE = 'H',
    COFFEE = 'C',
    TEA = 'T'
}

export class DrinkMaker {
    private static readonly costs = {
        [DrinkType.TEA]: 40,
        [DrinkType.HOT_CHOCOLATE]: 50,
        [DrinkType.COFFEE]: 60
    };

    constructor(private machine: CoffeeMachine) {
    }

    make(drink: Drink, payment: Cents) {
        const cost = DrinkMaker.costs[drink.type];
        if (payment < cost) {
            this.machine.order(`M:insufficient funds, ${cost - payment}¢ missing`);
        } else {
            this.machine.order(`${drink.type}:${drink.sugars || ''}:${drink.sugars ? '0' : ''}`);
        }
    }
}

