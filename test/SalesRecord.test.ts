import {SalesRecorder} from "../src/SalesRecorder";
import {CHOCOLATE, ORANGE_JUICE} from "./DrinkBuilder";
import { expect } from "chai";
import {times} from "./util";
import {DrinkType} from "../src/Drinks";

describe('Sales Record', () => {
    it('aggregates the drinks it recorded into a report', () => {
        const recorder = new SalesRecorder();
        recorder.add(ORANGE_JUICE.build());

        expect(recorder.getRecord()).to.eql({
            [DrinkType.ORANGE_JUICE]: 1
        });
    });

    it('aggregates multiple types of drinks', () => {
        const recorder = new SalesRecorder();
        recorder.add(ORANGE_JUICE.build());
        times(4).do(() => recorder.add(CHOCOLATE.build()));

        expect(recorder.getRecord()).to.eql({
            [DrinkType.ORANGE_JUICE]: 1,
            [DrinkType.HOT_CHOCOLATE]: 4
        });
    });
});