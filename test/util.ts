import {CoffeeMachine} from "../src/CoffeeMachine";
import {Reporter} from "../src/DrinkMaker";

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
