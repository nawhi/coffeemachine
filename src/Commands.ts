import {Drink, DRINK_NAMES} from "./Drink";


export class Commands {
    static insufficientFunds(cost: number, payment: number) {
        return `M:insufficient funds, ${cost - payment}¢ missing`;
    }

    static shortageOf(drink: Drink) {
        return `M:${DRINK_NAMES[drink.code]} shortage - maintenance have been notified`;
    }

    static fromDrink(drink: Drink): string {
        const code = drink.code + (drink.isExtraHot ? 'h' : '');
        const sugars = drink.sugars || '';
        const stirrer = drink.sugars ? '0' : '';

        return [code, sugars, stirrer].join(':');
    }
}
