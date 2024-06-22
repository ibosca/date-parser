import {TimeModifier, TimeOperator, TimeUnit} from "../domain/time-modifier";
import {TimeModifierExtractor} from "./time-modifier-extractor";

export type DateString = String;

export class DateParser {

    constructor(
        private readonly timeModifierExtractor: TimeModifierExtractor
    ) {}

    public parse(datestring: DateString): Date {
        const timeModifiers: TimeModifier[] = this.timeModifierExtractor.extract(datestring);

        return timeModifiers.reduce((carry, modifier): Date => {
            return modifier.apply(carry);
        }, new Date());
    }
    public stringify(date: Date): DateString {

        // current: 2020-05-01T00:00:00.000Z
        // date: 2019-05-01T00:00:00.000Z
        // expected output: now-1y

        const current = new Date();

        const diff = new Date(date.getTime() - current.getTime());
        console.log(`
        Current: ${current.toISOString()} 
        Date: ${date.toISOString()} 
        
        Years: ${this.yearDiff(current, date)}
        Month: ${this.monthDiff(current, date)}
        Week: ${this.weekDiff(current, date)}
        Day: ${this.dayDiff(current, date)}
        Hour: ${this.hourDiff(current, date)}
        Minute: ${this.minuteDiff(current, date)}
        Second: ${this.secondDiff(current, date)}
        `);

        return "";
    }

    private yearDiff(current: Date, date: Date): number {
        return date.getUTCFullYear() - current.getUTCFullYear();
    }

    private monthDiff(current: Date, date: Date): number {
        return date.getUTCMonth() - current.getUTCMonth();
    }

    private weekDiff(current: Date, date: Date): number {
        return (date.getUTCDate() - current.getUTCDate()) / 7;
    }

    private dayDiff(current: Date, date: Date): number {
        const days = (date.getUTCDate() - current.getUTCDate()) - this.weekDiff(current, date) * 7;
        return days > 0 ? days : 0;
    }

    private hourDiff(current: Date, date: Date): number {
        return date.getUTCHours() - current.getUTCHours();
    }

    private minuteDiff(current: Date, date: Date): number {
        return date.getUTCMinutes() - current.getUTCMinutes();
    }

    private secondDiff(current: Date, date: Date): number {
        return date.getUTCSeconds() - current.getUTCSeconds();
    }




}