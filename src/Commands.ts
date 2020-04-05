import {Drink, DRINK_NAMES} from "./Drink";


export class Commands {
    static insufficientFunds(cost: number, payment: number) {
        return `M:insufficient funds, ${cost - payment}¢ missing`;
    }

    static shortageOf(drink: Drink) {
        return `M:${DRINK_NAMES[drink.code]} shortage - maintenance have been notified`;
    }

    static fromDrink(d: Drink): string {
        const code = d.code + (d.isExtraHot ? 'h' : '');
        const sugars = d.sugars || '';
        const stirrer = d.sugars ? '0' : '';

        return [code, sugars, stirrer].join(':');
    }
}
