import {Drink, DrinkCode} from "../src/Drink";
import {Money} from "../src/DrinkMaker";

const prices = {
    [DrinkCode.TEA]: 40,
    [DrinkCode.HOT_CHOCOLATE]: 50,
    [DrinkCode.COFFEE]: 60,
    [DrinkCode.ORANGE_JUICE]: 60
};

export class HotDrinkBuilder implements Drink {

    constructor(
        public readonly code: DrinkCode,
        public readonly price: Money = prices[code]) {
    }

    public sugars: number = 0;
    public isExtraHot: boolean = false;

    public withSugars(n: number): HotDrinkBuilder {
        this.sugars = n;
        return this;
    }

    public extraHot() {
        this.isExtraHot = true;
        return this;
    }
}

export const TEA = new HotDrinkBuilder(DrinkCode.TEA);
export const COFFEE = new HotDrinkBuilder(DrinkCode.COFFEE);
export const CHOCOLATE = new HotDrinkBuilder(DrinkCode.HOT_CHOCOLATE);


export const ORANGE_JUICE: Drink = {
    code: DrinkCode.ORANGE_JUICE,
    price: 60
};
