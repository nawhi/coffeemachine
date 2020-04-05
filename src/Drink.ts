import {Money} from "./DrinkMaker";

export enum DrinkCode {
    HOT_CHOCOLATE = 'H',
    COFFEE = 'C',
    TEA = 'T',
    ORANGE_JUICE = 'O',
}

export type Drink = {
    code: DrinkCode;
    price: Money;
    sugars?: number;
    isExtraHot?: boolean;
}

export const DRINK_NAMES = {
    [DrinkCode.HOT_CHOCOLATE]: 'chocolate',
    [DrinkCode.TEA]: 'tea',
    [DrinkCode.COFFEE]: 'coffee',
    [DrinkCode.ORANGE_JUICE]: 'orange juice'
};
