import {Money} from "./DrinkMaker";

export enum DrinkType {
    HOT_CHOCOLATE = 'H',
    COFFEE = 'C',
    TEA = 'T',
    ORANGE_JUICE = 'O'
}

export const DRINK_NAMES = {
    [DrinkType.HOT_CHOCOLATE]: 'chocolate',
    [DrinkType.TEA]: 'tea',
    [DrinkType.COFFEE]: 'coffee',
    [DrinkType.ORANGE_JUICE]: 'orange juice'
};

export const DRINK_PRICES = {
    [DrinkType.TEA]: 40,
    [DrinkType.HOT_CHOCOLATE]: 50,
    [DrinkType.COFFEE]: 60,
    [DrinkType.ORANGE_JUICE]: 60
};

export class Drink {
    public readonly price: Money;

    constructor(
        public readonly type: DrinkType,
        public readonly extraHot: boolean = false,
        public readonly sugars: number = 0
    ) {
        this.price = DRINK_PRICES[type];
    }

    toCommand(): string {
        return DrinkCommandGenerator.commandFor(this);
    }
}

class DrinkCommandGenerator {
    public static commandFor(drink: Drink): string {
        const drinkKey = drink.type + (drink.extraHot ? 'h' : '');
        const sugars = drink.sugars || '';
        const stirrer = drink.sugars ? '0' : '';
        return [drinkKey, sugars, stirrer].join(':');
    }
}
