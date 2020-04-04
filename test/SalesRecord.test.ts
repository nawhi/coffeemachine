import {SalesRecord} from "../src/SalesRecord";
import {ORANGE_JUICE} from "./DrinkBuilder";

describe('Sales Record', () => {
    it('aggregates the drinks it recorded into a report', () => {
        const record = new SalesRecord();
        record.add(ORANGE_JUICE.build());

    });
});
