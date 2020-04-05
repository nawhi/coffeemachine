import {Money} from "./DrinkMaker";

export enum DrinkType {
    HOT_CHOCOLATE = 'H',
    COFFEE = 'C',
    TEA = 'T',
    ORANGE_JUICE = 'O'
}

export interface Drink {
    readonly type: DrinkType;
    readonly price: Money;
    toCommand(): string;
}

export class HotDrink implements Drink {
    constructor(public readonly type: DrinkType,
                public readonly price: Money,
                private readonly sugars: number,
                private readonly isExtraHot: boolean) {
    }

    toCommand(): string {
        const drink = this.type + (this.isExtraHot ? 'h' : '');
        const sugars = this.sugars || '';
        const stirrer = this.sugars ? '0' : '';
        return [drink, sugars, stirrer].join(':');
    }
}

export class ColdDrink implements Drink {
    constructor(public readonly type: DrinkType, public readonly price: Money) {
    }

    toCommand(): string {
        return `${this.type}::`;
    }
}

export const DRINK_NAMES = {
    [DrinkType.HOT_CHOCOLATE]: 'chocolate',
    [DrinkType.TEA]: 'tea',
    [DrinkType.COFFEE]: 'coffee',
    [DrinkType.ORANGE_JUICE]: 'orange juice'
};
