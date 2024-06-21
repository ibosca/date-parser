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



});
