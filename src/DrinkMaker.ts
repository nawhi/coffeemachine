import {CoffeeMachine} from "./CoffeeMachine";
import {SalesRecorder} from "./SalesRecorder";
import {Drink, DRINK_NAMES, DRINK_PRICES} from "./Drinks";

export type Money = number;

export interface Reporter {
    report(val: string): void;
}

export class DrinkMaker {
    private sales = new SalesRecorder();

    constructor(private machine: CoffeeMachine) {
    }

    make(drink: Drink, payment: Money) {
        const cost = drink.price;
        if (payment < cost) {
            this.machine.send(`M:insufficient funds, ${cost - payment}¢ missing`);
        } else {
            this.machine.send(drink.toCommand());
            this.sales.add(drink);
        }
    }

    printReport(reporter: Reporter) {
        const sales = this.sales.getRecord();

        const revenue = this.sales.totalRevenue();

        const drinksList = Object.entries(sales)
            .map(([type, count]) => `${count} ${DRINK_NAMES[type]}`)
            .join(", ");

        reporter.report(`Drinks sold: ${drinksList || '0'}`);
        reporter.report(`Total revenue: ${revenue}¢`);
    }
}

