import {ColdDrink, DrinkCode, HotDrink} from "../src/Drink";

const costs = {
    [DrinkCode.TEA]: 40,
    [DrinkCode.HOT_CHOCOLATE]: 50,
    [DrinkCode.COFFEE]: 60,
    [DrinkCode.ORANGE_JUICE]: 60
};

export class ColdDrinkBuilder {
    constructor(protected type: DrinkCode) {
    }

    public build() {
        return new ColdDrink(this.type, costs[this.type]);
    }
}

export class HotDrinkBuilder extends ColdDrinkBuilder {

    private numSugars: number = 0;
    private isExtraHot: boolean = false;

    public sugars(n: number): HotDrinkBuilder {
        this.numSugars = n;
        return this;
    }

    public build() {
        return new HotDrink(this.type, costs[this.type], this.numSugars, this.isExtraHot);
    }

    public extraHot() {
        this.isExtraHot = true;
        return this;
    }
}

export const TEA = new HotDrinkBuilder(DrinkCode.TEA);
export const COFFEE = new HotDrinkBuilder(DrinkCode.COFFEE);
export const CHOCOLATE = new HotDrinkBuilder(DrinkCode.HOT_CHOCOLATE);
export const ORANGE_JUICE = new ColdDrinkBuilder(DrinkCode.ORANGE_JUICE);
