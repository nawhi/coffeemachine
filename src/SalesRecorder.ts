import {Drink, DrinkType} from "./Drink";
import {DrinkMaker, Money} from "./DrinkMaker";

type SalesList = { [key in DrinkType]?: number };

export class SalesRecorder {
    private record: SalesList = {};
    private total: Money = 0;

    add(drink: Drink) {
        if ((this.record)[drink.type]) {
            (this.record)[drink.type]++;
        } else {
            (this.record)[drink.type] = 1;
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
