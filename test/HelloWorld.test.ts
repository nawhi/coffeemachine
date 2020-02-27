import {HelloWorld} from "../src/HelloWorld";
import { expect } from "chai";

describe('Hello World', () => {
    it('greets me', () => {
        const greeting: string = new HelloWorld().greeting();
        expect(greeting).to.eql("Hello, World");
    });
});
