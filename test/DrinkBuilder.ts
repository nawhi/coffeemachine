import {Drink, DrinkType} from "../src/DrinkMaker";

export class DrinkBuilder {
    constructor(private type: DrinkType) {
    }

    private numSugars: number;

    public sugars(n: number): DrinkBuilder {
        this.numSugars = n;
        return this;
    }

    public build() {
        return new Drink(this.type, this.numSugars);
    }
}

export const TEA = new DrinkBuilder(DrinkType.TEA);
