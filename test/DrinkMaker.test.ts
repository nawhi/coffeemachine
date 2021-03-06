import {expect} from "chai";
import {DrinkMaker} from "../src/DrinkMaker";
import * as DrinkBuilder from "./DrinkBuilder";
import {CHOCOLATE, COFFEE, ORANGE_JUICE, TEA} from "./DrinkBuilder";
import {
    CoffeeMachineSpy,
    CoffeeMachineStub,
    EmailNotifierSpy,
    MissingQuantityChecker,
    ReporterSpy,
    times
} from "./util";
import {DrinkCode} from "../src/Drink";

const ENOUGH_MONEY = 9999;

describe("Drink Maker", () => {
    describe("drink types", () => {
        it("makes a tea for 0,4 euro", () => {
            const machine = new CoffeeMachineSpy();
            const drinkMaker = new DrinkMaker(machine);
            drinkMaker.make(TEA, 40);
            expect(machine.lastReceivedCommand()).to.eq("T::");
        });

        it("makes a coffee for 0,6 euro", () => {
            const machine = new CoffeeMachineSpy();
            const drinkMaker = new DrinkMaker(machine);
            drinkMaker.make(COFFEE, 60);
            expect(machine.lastReceivedCommand()).to.eq("C::");
        });

        it("makes a hot chocolate for 0,5 euro", () => {
            const machine = new CoffeeMachineSpy();
            const drinkMaker = new DrinkMaker(machine);
            drinkMaker.make(CHOCOLATE, 50);
            expect(machine.lastReceivedCommand()).to.eq("H::");
        });

        it("makes an orange juice for 0,6 euro", () => {
            const machine = new CoffeeMachineSpy();
            const drinkMaker = new DrinkMaker(machine);
            drinkMaker.make(ORANGE_JUICE, 60);
            expect(machine.lastReceivedCommand()).to.eq("O::");
        })
    });

    describe("payment", () => {
        it("makes a drink if paid more than its cost", () => {
            const machine = new CoffeeMachineSpy();
            const drinkMaker = new DrinkMaker(machine);
            drinkMaker.make(TEA, 90);
            expect(machine.lastReceivedCommand()).to.eq("T::");
        });

        it("sends a message with the difference instead if insufficient funds", () => {
            const machine = new CoffeeMachineSpy();
            const drinkMaker = new DrinkMaker(machine);
            drinkMaker.make(TEA, 30);
            const command = machine.lastReceivedCommand();
            expect(command).to.match(/^M:/);
            expect(command).to.contain("10¢");
        });

        it("sends insufficient funds message for cold drink", () => {
            const machine = new CoffeeMachineSpy();
            const drinkMaker = new DrinkMaker(machine);
            drinkMaker.make(ORANGE_JUICE, 30);

            const command = machine.lastReceivedCommand();
            expect(command).to.match(/^M:/);
            expect(command).to.contain("30¢");
        });
    });

    describe("sugars and stick combinations", () => {
        it("makes a tea with 1 sugar and a stick", () => {
            const machine = new CoffeeMachineSpy();
            const drinkMaker = new DrinkMaker(machine);
            drinkMaker.make(TEA.withSugars(1), 40);
            expect(machine.lastReceivedCommand()).to.eq("T:1:0");
        });

        it("makes a coffee with 2 sugars and a stick", () => {
            const machine = new CoffeeMachineSpy();
            const drinkMaker = new DrinkMaker(machine);
            drinkMaker.make(COFFEE.withSugars(2), 60);
            expect(machine.lastReceivedCommand()).to.eq("C:2:0");
        });
    });

    describe('extra hot drinks', () => {
        it('makes an extra hot coffee', () => {
            const machine = new CoffeeMachineSpy();
            const drinkMaker = new DrinkMaker(machine);
            const drink = COFFEE
                .extraHot()
                .withSugars(1);

            drinkMaker.make(drink, 60);
            expect(machine.lastReceivedCommand()).to.eq("Ch:1:0");
        });

        it('makes an extra hot chocolate with 4 sugars', () => {
            const machine = new CoffeeMachineSpy();
            const drinkMaker = new DrinkMaker(machine);
            const drink = CHOCOLATE
                .extraHot()
                .withSugars(4);

            drinkMaker.make(drink, 60);
            expect(machine.lastReceivedCommand()).to.eq("Hh:4:0");
        });
    });

    describe('reporting', () => {
        it('prints a report with drink count and revenue', () => {
            const reporterSpy = new ReporterSpy();
            const drinkMaker = new DrinkMaker(new CoffeeMachineStub());

            drinkMaker.reportTo(reporterSpy);
            expect(reporterSpy.getReport()).to.eql(
                "Drinks sold: 0\n" +
                "Total revenue: 0¢"
            );
        });

        it('prints a report itemising by drink type', () => {
            const reporterSpy = new ReporterSpy();
            const drinkMaker = new DrinkMaker(new CoffeeMachineStub());

            drinkMaker.make(TEA, ENOUGH_MONEY);
            times(2).do(() => drinkMaker.make(ORANGE_JUICE, ENOUGH_MONEY));
            times(3).do(() => drinkMaker.make(COFFEE, ENOUGH_MONEY));
            times(4).do(() => drinkMaker.make(CHOCOLATE, ENOUGH_MONEY));

            drinkMaker.reportTo(reporterSpy);
            expect(reporterSpy.getReport()).to.eql(
                "Drinks sold: 1 tea, 2 orange juice, 3 coffee, 4 chocolate\n" +
                "Total revenue: 540¢"
            );
        });
    });

    describe('Shortage notifications', () => {
        it('notifies when a drink is missing', () => {
            const checker = new MissingQuantityChecker();
            const notifier = new EmailNotifierSpy();

            const machine = new CoffeeMachineSpy();
            const drinkMaker = new DrinkMaker(machine, notifier, checker);
            drinkMaker.make(TEA, ENOUGH_MONEY);

            expect(notifier.lastReceivedNotification()).to.eql(DrinkCode.TEA);
            expect(machine.lastReceivedCommand()).to.eql('M:tea shortage - maintenance have been notified');
        });
    });
});
