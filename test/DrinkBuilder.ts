import {ColdDrink, DrinkType, HotDrink} from "../src/Drink";

const costs = {
    [DrinkType.TEA]: 40,
    [DrinkType.HOT_CHOCOLATE]: 50,
    [DrinkType.COFFEE]: 60,
    [DrinkType.ORANGE_JUICE]: 60
};

export class ColdDrinkBuilder {
    constructor(protected type: DrinkType) {
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

export const TEA = new HotDrinkBuilder(DrinkType.TEA);
export const COFFEE = new HotDrinkBuilder(DrinkType.COFFEE);
export const CHOCOLATE = new HotDrinkBuilder(DrinkType.HOT_CHOCOLATE);
export const ORANGE_JUICE = new ColdDrinkBuilder(DrinkType.ORANGE_JUICE);
