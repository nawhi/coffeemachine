import {CoffeeMachine} from "./CoffeeMachine";

type Cents = number;

export interface Drink {
    readonly type: DrinkType;
    toCommand(): string;
}

export class HotDrink implements Drink {
    constructor(public readonly type: DrinkType,
                public readonly sugars: number, public readonly isExtraHot: boolean) {
    }

    toCommand(): string {
        return `${this.type}${this.isExtraHot ? 'h' : ''}:${this.sugars || ''}:${this.sugars ? '0' : ''}`;
    }
}

export class ColdDrink implements Drink {
    constructor(public readonly type: DrinkType) {}

    toCommand(): string {
        return `${this.type}::`;
    }
}

export enum DrinkType {
    HOT_CHOCOLATE = 'H',
    COFFEE = 'C',
    TEA = 'T',
    ORANGE_JUICE = 'O'
}

export class DrinkMaker {
    private static readonly costs = {
        [DrinkType.TEA]: 40,
        [DrinkType.HOT_CHOCOLATE]: 50,
        [DrinkType.COFFEE]: 60,
        [DrinkType.ORANGE_JUICE]: 60
    };

    constructor(private machine: CoffeeMachine) {
    }

    make(drink: Drink, payment: Cents) {
        const cost = DrinkMaker.costs[drink.type];
        if (payment < cost) {
            this.machine.order(`M:insufficient funds, ${cost - payment}¢ missing`);
        } else {
            this.machine.order(drink.toCommand());
        }
    }
}

