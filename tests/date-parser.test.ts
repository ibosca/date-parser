import {DateParser} from "../src/service/date-parser";
import {TimeModifierExtractor} from "../src/service/time-modifier-extractor";

describe('Date Parser', () => {

    let sut: DateParser;

    beforeEach(() => {
        const mockedDate = new Date('2020-05-01T00:00:00.000Z');

        jest.useFakeTimers();
        jest.setSystemTime(mockedDate);

        const extractor = new TimeModifierExtractor();
        sut = new DateParser(extractor);
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('parse now-1y/y', () => {
        const expected: Date = new Date('2019-01-01T00:00:00.000Z');
        const actual: Date = sut.parse('now-1y/y');
        expect(actual).toStrictEqual(expected);
    });

    test('parse now/y', () => {
        const expected: Date = new Date('2020-01-01T00:00:00.000Z');
        const actual: Date = sut.parse('now/y');
        expect(actual).toStrictEqual(expected);
    });

    test('parse now-1d', () => {
        const expected: Date = new Date('2020-04-30T00:00:00.000Z');
        const actual: Date = sut.parse('now-1d');
        expect(actual).toStrictEqual(expected);
    });

    test('parse now+1d', () => {
        const expected: Date = new Date('2020-05-02T00:00:00.000Z');
        const actual: Date = sut.parse('now+1d');
        expect(actual).toStrictEqual(expected);
    });

    test('now-4d-4h', () => {
        const expected: Date = new Date('2020-04-26T20:00:00.000Z');
        const actual: Date = sut.parse('now-4d-4h');
        expect(actual).toStrictEqual(expected);
    });

});
