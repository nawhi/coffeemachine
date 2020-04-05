import {CoffeeMachine} from "./CoffeeMachine";
import {SalesRecorder} from "./SalesRecorder";

type Cents = number;

export interface Drink {
    readonly type: DrinkType;

    toCommand(): string;
}

export interface Reporter {
    report(val: string): void;
}

const defaultReporter: Reporter = {report: console.log};

export class HotDrink implements Drink {
    constructor(readonly type: DrinkType,
                private readonly sugars: number, private readonly isExtraHot: boolean) {
    }

    toCommand(): string {
        const drink = this.type + (this.isExtraHot ? 'h' : '');
        const sugars = this.sugars || '';
        const stirrer = this.sugars ? '0' : '';
        return [drink, sugars, stirrer].join(':');
    }
}

export class ColdDrink implements Drink {
    constructor(public readonly type: DrinkType) {
    }

    toCommand(): string {
        return `${this.type}::`;
    }
}

export enum DrinkType {
    HOT_CHOCOLATE = 'H',
    COFFEE = 'C',
    TEA = 'T',
    ORANGE_JUICE = 'O'
}

const DRINK_NAMES = {
    [DrinkType.HOT_CHOCOLATE]: 'chocolate',
    [DrinkType.TEA]: 'tea',
    [DrinkType.COFFEE]: 'coffee',
    [DrinkType.ORANGE_JUICE]: 'orange juice'
};

export class DrinkMaker {
    private static readonly costs = {
        [DrinkType.TEA]: 40,
        [DrinkType.HOT_CHOCOLATE]: 50,
        [DrinkType.COFFEE]: 60,
        [DrinkType.ORANGE_JUICE]: 60
    };

    private sales = new SalesRecorder();

    constructor(private machine: CoffeeMachine) {
    }

    make(drink: Drink, payment: Cents) {
        const cost = DrinkMaker.costs[drink.type];
        if (payment < cost) {
            this.machine.send(`M:insufficient funds, ${cost - payment}¢ missing`);
        } else {
            this.machine.send(drink.toCommand());
            this.sales.add(drink);
        }
    }

    printReport(reporter: Reporter) {
        const sales = this.sales.getRecord();

        const revenue = Object.entries(sales)
            .map(([type, count]) => DrinkMaker.costs[type] * count)
            .reduce((a, b) => a + b, 0);

        const drinksList = Object.entries(sales)
            .map(([type, count]) => `${count} ${DRINK_NAMES[type]}`)
            .join(", ");

        reporter.report(`Drinks sold: ${drinksList || '0'}`);
        reporter.report(`Total revenue: ${revenue}¢`);
    }
}

