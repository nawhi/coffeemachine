import {Drink, DrinkCode} from "./Drink";
import {Money} from "./DrinkMaker";

type SalesList = { [key in DrinkCode]?: number };

export class SalesRecorder {
    private record: SalesList = {};
    private total: Money = 0;

    add(drink: Drink) {
        if ((this.record)[drink.code]) {
            (this.record)[drink.code]++;
        } else {
            (this.record)[drink.code] = 1;
        }
        this.total += drink.price;
    }

    getRecord(): SalesList {
        return { ...this.record };
    }

    totalRevenue(): Money {
        return this.total;
    }
}
