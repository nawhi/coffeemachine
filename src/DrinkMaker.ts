import {CoffeeMachine} from "./CoffeeMachine";
import {SalesRecorder} from "./SalesRecorder";
import {Drink} from "./Drinks";

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
        const revenue = this.sales.getTotal();

        const salesByType = this.sales.byDrinkType();
        const drinksSold = Object.entries(salesByType)
                .map(([name, count]) => `${count} ${name}`)
                .join(", ")
            || '0';

        reporter.report(`Drinks sold: ${drinksSold}`);
        reporter.report(`Total revenue: ${revenue}¢`);
    }
}

