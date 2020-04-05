import {Money} from "./DrinkMaker";

export enum DrinkCode {
    HOT_CHOCOLATE = 'H',
    COFFEE = 'C',
    TEA = 'T',
    ORANGE_JUICE = 'O',
}

export interface Drink {
    readonly code: DrinkCode;
    readonly price: Money;
    readonly sugars: number;
    readonly isExtraHot: boolean;
}

export class HotDrink implements Drink {
    constructor(public readonly code: DrinkCode,
                public readonly price: Money,
                public readonly sugars: number,
                public readonly isExtraHot: boolean) {
    }
}

export class ColdDrink implements Drink {
    readonly isExtraHot: boolean = false;
    readonly sugars: number = 0;

    constructor(
        public readonly code: DrinkCode,
        public readonly price: Money
    ) {
    }
}

export const DRINK_NAMES = {
    [DrinkCode.HOT_CHOCOLATE]: 'chocolate',
    [DrinkCode.TEA]: 'tea',
    [DrinkCode.COFFEE]: 'coffee',
    [DrinkCode.ORANGE_JUICE]: 'orange juice'
};
