import {SalesRecorder} from "../src/SalesRecorder";
import {CHOCOLATE, ORANGE_JUICE, TEA} from "./DrinkBuilder";
import { expect } from "chai";
import {times} from "./util";
import {DrinkType} from "../src/Drinks";

describe('Sales Recorder', () => {
    it('aggregates the drinks it recorded into a report', () => {
        const recorder = new SalesRecorder();
        recorder.add(ORANGE_JUICE.build());

        expect(recorder.byDrinkType()).to.eql({
            'orange juice': 1
        });
    });

    it('aggregates multiple types of drinks', () => {
        const recorder = new SalesRecorder();
        recorder.add(ORANGE_JUICE.build());
        times(4).do(() => recorder.add(CHOCOLATE.build()));

        expect(recorder.byDrinkType()).to.eql({
            'orange juice': 1,
            'chocolate': 4
        });
    });

    it('calculates total revenue', () => {
        const recorder = new SalesRecorder();
        recorder.add(ORANGE_JUICE.build());
        times(4).do(() => recorder.add(CHOCOLATE.build()));
        times(3).do(() => recorder.add(TEA.build()));

        expect(recorder.getTotal()).to.eql(380);
    });
});
