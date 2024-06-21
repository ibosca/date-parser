import {DateParser} from "../src/date-parser";

describe('Date Parser', () => {

    let sut: DateParser;

    beforeEach(() => {
        const mockedDate = new Date('2020-05-01T00:00:00.000Z');

        jest.useFakeTimers();
        jest.setSystemTime(mockedDate);

        sut = new DateParser();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('adds 1 + 2 to equal 3', () => {
        const sut = new DateParser();
        expect(sut.sum(1, 2)).toBe(3);
    });

    test('parse now-1y/y', () => {
        const expected: Date = new Date('2019-01-01T00:00:00.000Z');
        const actual: Date = sut.parse('now-1y/y');
        expect(actual).toBe(expected);
    });

});
