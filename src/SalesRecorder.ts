import {Drink, DRINK_NAMES, DrinkType} from "./Drinks";

type SalesList = { [key in DrinkType]?: number };

export class SalesRecorder {
    private record: SalesList = {};
    private record2: Drink[] = [];

    add(drink: Drink) {
        if ((this.record)[drink.type]) {
            (this.record)[drink.type]++;
        } else {
            (this.record)[drink.type] = 1;
        }
        this.record2.push(drink);
    }

    getRecord(): SalesList {
        return {...this.record};
    }

    totalRevenue(): number {
        return this.record2
            .map(d => d.price)
            .reduce((a, b) => a + b, 0);
    }

}
