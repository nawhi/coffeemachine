import {SalesRecorder} from "../src/SalesRecorder";
import {CHOCOLATE, ORANGE_JUICE} from "./DrinkBuilder";
import {expect} from "chai";
import {times} from "./util";
import {DrinkCode} from "../src/Drink";

describe('Sales Record', () => {
    it('aggregates the drinks it recorded into a report', () => {
        const recorder = new SalesRecorder();
        recorder.add(ORANGE_JUICE);

        expect(recorder.getRecord()).to.eql({
            [DrinkCode.ORANGE_JUICE]: 1
        });
    });

    it('aggregates multiple types of drinks', () => {
        const recorder = new SalesRecorder();
        recorder.add(ORANGE_JUICE);
        times(4).do(() => recorder.add(CHOCOLATE));

        expect(recorder.getRecord()).to.eql({
            [DrinkCode.ORANGE_JUICE]: 1,
            [DrinkCode.HOT_CHOCOLATE]: 4
        });
    });

    it('gets total across all drinks registered', () => {
        const recorder = new SalesRecorder();
        times(7).do(() => recorder.add(ORANGE_JUICE));
        times(4).do(() => recorder.add(CHOCOLATE));

        expect(recorder.totalRevenue()).to.eql(620);
    });
});
