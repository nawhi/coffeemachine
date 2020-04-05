import {CoffeeMachine} from "./CoffeeMachine";
import {SalesRecorder} from "./SalesRecorder";
import {Drink, DRINK_NAMES, DrinkType} from "./Drink";

export type Money = number;

export interface Reporter {
    report(val: string): void;
}

export interface EmailNotifier {
    notifyMissingDrink(type: DrinkType): void;
}

export interface BeverageQuantityChecker {
    isEmpty(type: DrinkType): boolean;
}

export class DrinkMaker {
    private static readonly costs = {
        [DrinkType.TEA]: 40,
        [DrinkType.HOT_CHOCOLATE]: 50,
        [DrinkType.COFFEE]: 60,
        [DrinkType.ORANGE_JUICE]: 60
    };

    private sales = new SalesRecorder();

    constructor(
        private machine: CoffeeMachine,
        private notifier: EmailNotifier = defaultNotifier,
        private checker: BeverageQuantityChecker = defaultQuantityChecker
    ) {
    }

    make(drink: Drink, payment: Money) {
        const cost = drink.price;
        if (payment < cost) {
            this.machine.send(`M:insufficient funds, ${cost - payment}¢ missing`);
        } else if (this.checker.isEmpty(drink.type)) {
            this.notifier.notifyMissingDrink(drink.type);
            this.machine.send(`M:${DRINK_NAMES[drink.type]} shortage - maintenance have been notified`);
        } else {
            this.machine.send(drink.toCommand());
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

const defaultNotifier = {
    notifyMissingDrink(ignored: DrinkType) {
    }
};

const defaultQuantityChecker = {
    isEmpty(drink: DrinkType) {
        return false;
    }
};

