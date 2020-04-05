import {Money} from "./DrinkMaker";

export enum DrinkType {
    HOT_CHOCOLATE = 'H',
    COFFEE = 'C',
    TEA = 'T',
    ORANGE_JUICE = 'O'
}

export type DrinkData = {
    code: string;
    displayName: string;
    price: Money;
}

export const DRINK_TYPES: {[key: string]: DrinkData} = {
    Chocolate: {
        code: 'H',
        displayName: 'chocolate',
        price: 50
    },
    Tea: {
        code: 'T',
        displayName: 'tea',
        price: 40
    },
    Coffee: {
        code: 'C',
        displayName: 'coffee',
        price: 60
    },
    OrangeJuice: {
        code: 'O',
        displayName: 'orange juice',
        price: 60
    }
};

export class Drink {
    public readonly price: Money;
    public readonly displayName: string;
    public readonly code: string;

    constructor(
        data: DrinkData,
        public readonly extraHot: boolean = false,
        public readonly sugars: number = 0
    ) {
        const { code, price, displayName } = data;
        this.code = code;
        this.price = price;
        this.displayName = displayName;
    }

    toCommand(): string {
        return DrinkCommandGenerator.commandFor(this);
    }
}

class DrinkCommandGenerator {
    public static commandFor(drink: Drink): string {
        const drinkKey = drink.code + (drink.extraHot ? 'h' : '');
        const sugars = drink.sugars || '';
        const stirrer = drink.sugars ? '0' : '';
        return [drinkKey, sugars, stirrer].join(':');
    }
}
