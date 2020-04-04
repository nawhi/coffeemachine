import {Drink, DrinkType} from "./DrinkMaker";

type SalesList = { [key in DrinkType]?: number };

export class SalesRecorder {
    private record: SalesList = {};

    add(drink: Drink) {
        if ((this.record)[drink.type]) {
            (this.record)[drink.type]++;
        } else {
            (this.record)[drink.type] = 1;
        }
    }

    getRecord(): SalesList {
        return { ...this.record };
    }
}
