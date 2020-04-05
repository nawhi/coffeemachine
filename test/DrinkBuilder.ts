import {Drink, DRINK_TYPES, DrinkData} from "../src/Drinks";

export class ColdDrinkBuilder {
    constructor(protected data: DrinkData) {
    }

    public build() {
        return new Drink(this.data);
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
        return new Drink(this.data, this.isExtraHot, this.numSugars);
    }

    public extraHot() {
        this.isExtraHot = true;
        return this;
    }
}

// export const TEA = new HotDrinkBuilder(DrinkType.TEA);
// export const COFFEE = new HotDrinkBuilder(DrinkType.COFFEE);
// export const CHOCOLATE = new HotDrinkBuilder(DrinkType.HOT_CHOCOLATE);
// export const ORANGE_JUICE = new ColdDrinkBuilder(DrinkType.ORANGE_JUICE);

export const TEA = new HotDrinkBuilder(DRINK_TYPES.Tea);
export const COFFEE = new HotDrinkBuilder(DRINK_TYPES.Coffee);
export const CHOCOLATE = new HotDrinkBuilder(DRINK_TYPES.Chocolate);
export const ORANGE_JUICE = new ColdDrinkBuilder(DRINK_TYPES.OrangeJuice);
