import {CoffeeMachine} from "../src/CoffeeMachine";
import {BeverageQuantityChecker, EmailNotifier, Reporter} from "../src/DrinkMaker";
import {DrinkCode} from "../src/Drink";

export function times(n: number) {
    return {
        do(callback: () => void) {
            Array(n).fill(1).forEach(() => callback());
        }
    }
}

export class CoffeeMachineStub implements CoffeeMachine {
    send(command: string) {
    }
}

export class ReporterSpy implements Reporter {
    private reports: string[] = [];

    report(val: string): void {
        this.reports.push(val);
    }

    getReport() {
        return this.reports.join('\n');
    }

}

export class CoffeeMachineSpy implements CoffeeMachine {
    private commands: string[] = [];

    send(command: string) {
        this.commands.push(command);
    }

    lastReceivedCommand() {
        return this.commands[this.commands.length - 1];
    }
}

export class EmailNotifierSpy implements EmailNotifier {
    public readonly notifications: DrinkCode[] = [];

    notifyMissingDrink(type: DrinkCode): void {
        this.notifications.push(type);
    }

    public lastReceivedNotification() {
        return this.notifications[this.notifications.length - 1];
    }

}

export class MissingQuantityChecker implements BeverageQuantityChecker {
    isEmpty(drink: DrinkCode): boolean {
        return true;
    }
}
