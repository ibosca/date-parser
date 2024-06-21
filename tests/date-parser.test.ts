import {DateParser} from "../src/date-parser";

test('adds 1 + 2 to equal 3', () => {
    const sut = new DateParser();
    expect(sut.sum(1, 2)).toBe(3);
});