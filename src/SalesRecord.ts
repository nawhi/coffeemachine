import {Drink, DrinkType} from "./DrinkMaker";

type SalesList = { [key in DrinkType]: number };

export class SalesRecord {
    add(drink: Drink) {
        // throw new Error();
    }

    getRecord(): SalesList {
        throw new Error();
    }
}
