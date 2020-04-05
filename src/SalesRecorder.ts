import {Drink, DrinkType} from "./Drinks";
import {Money} from "./DrinkMaker";

type SalesList = { [key: string]: number };

export class SalesRecorder {
    private record: SalesList = {};
    private record2: Drink[] = [];

    private total: Money = 0;


    add(drink: Drink) {
        if ((this.record)[drink.displayName]) {
            (this.record)[drink.displayName]++;
        } else {
            (this.record)[drink.displayName] = 1;
        }
        this.total += drink.price;
    }

    byDrinkType() {
        return {...this.record};
    }

    getTotal(): number {
        return this.total;
    }

}
