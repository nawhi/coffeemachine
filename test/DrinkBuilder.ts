import {Drink, DrinkCode} from "../src/Drink";
import {Money} from "../src/DrinkMaker";

const prices = {
    [DrinkCode.TEA]: 40,
    [DrinkCode.HOT_CHOCOLATE]: 50,
    [DrinkCode.COFFEE]: 60,
    [DrinkCode.ORANGE_JUICE]: 60
};

export class HotDrinkBuilder {

    constructor(public readonly code: DrinkCode) {

    }

    private numSugars: number = 0;
    private isExtraHot: boolean = false;

    public sugars(n: number): HotDrinkBuilder {
        this.numSugars = n;
        return this;
    }

    public build(): Drink {

        return {
            code: this.code,
            price: prices[this.code],
            sugars: this.numSugars,
            isExtraHot: this.isExtraHot
        };
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
