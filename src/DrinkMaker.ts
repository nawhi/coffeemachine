import {CoffeeMachine} from "./CoffeeMachine";
import {SalesRecorder} from "./SalesRecorder";
import {Drink, DRINK_NAMES, DrinkCode} from "./Drink";
import {Commands} from "./Commands";

export type Money = number;

export interface Reporter {
    report(val: string): void;
}

export interface EmailNotifier {
    notifyMissingDrink(type: DrinkCode): void;
}

export interface BeverageQuantityChecker {
    isEmpty(type: DrinkCode): boolean;
}

export class DrinkMaker {
    private sales = new SalesRecorder();

    constructor(
        private machine: CoffeeMachine,
        private notifier: EmailNotifier = defaultNotifier,
        private checker: BeverageQuantityChecker = defaultQuantityChecker
    ) {
    }

    make(drink: Drink, payment: Money) {
        if (payment < drink.price) {
            this.machine.send(Commands.insufficientFunds(drink.price, payment));
        } else if (this.checker.isEmpty(drink.code)) {
            this.notifier.notifyMissingDrink(drink.code);
            this.machine.send(Commands.shortageOf(drink));
        } else {
            this.machine.send(Commands.fromDrink(drink));
            this.sales.add(drink);
        }
    }

    printReport(reporter: Reporter) {
        const revenue = this.sales.totalRevenue();

        const record = this.sales.getRecord();
        const drinksList = Object.entries(record)
            .map(([type, count]) => `${count} ${DRINK_NAMES[type]}`)
            .join(", ");

        reporter.report(`Drinks sold: ${drinksList || '0'}`);
        reporter.report(`Total revenue: ${revenue}¢`);
    }
}

const defaultNotifier: EmailNotifier = {
    notifyMissingDrink(ignored: DrinkCode) {
    }
};

const defaultQuantityChecker: BeverageQuantityChecker = {
    isEmpty(ignored: DrinkCode) {
        return false;
    }
};

