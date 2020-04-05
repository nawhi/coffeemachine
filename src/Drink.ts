import {Money} from "./DrinkMaker";

export enum DrinkType {
    HOT_CHOCOLATE,
    COFFEE,
    TEA,
    ORANGE_JUICE,
}

export interface Drink {
    readonly type: DrinkType;
    readonly price: Money;
    readonly sugars: number;
    readonly isExtraHot: boolean;
}

export class HotDrink implements Drink {
    constructor(public readonly type: DrinkType,
                public readonly price: Money,
                public readonly sugars: number,
                public readonly isExtraHot: boolean) {
    }
}

export class ColdDrink implements Drink {
    readonly isExtraHot: boolean = false;
    readonly sugars: number = 0;

    constructor(
        public readonly type: DrinkType,
        public readonly price: Money
    ) {
    }
}

export const DRINK_NAMES = {
    [DrinkType.HOT_CHOCOLATE]: 'chocolate',
    [DrinkType.TEA]: 'tea',
    [DrinkType.COFFEE]: 'coffee',
    [DrinkType.ORANGE_JUICE]: 'orange juice'
};
