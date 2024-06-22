import {TimeModifier, TimeUnit} from "../domain/time-modifier";
import {TimeModifierExtractor} from "./time-modifier-extractor";

export type DateString = String;

type TimeDiff = (current: Date, date: Date) => number;
type TimeRounded = (current: Date, date: Date) => boolean;

type StringifyChecker = {
    unit: TimeUnit,
    diff: TimeDiff,
    rounded: TimeRounded
};

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

        let output: DateString = 'now';
        const current = new Date();

        const checkers: StringifyChecker[] = [
            {
                unit: 'y',
                diff: (current: Date, date: Date) => this.yearDiff(current, date),
                rounded: (current: Date, date: Date) => this.isYearRounded(current, date)},
            {
                unit: 'M',
                diff: (current: Date, date: Date) => this.monthDiff(current, date),
                rounded: (current: Date, date: Date) => this.isMonthRounded(current, date)
            },
            {
                unit: 'w',
                diff: (current: Date, date: Date) => this.weekDiff(current, date),
                rounded: (current: Date, date: Date) => this.isWeekRounded(current, date)
            },
            {
                unit: 'd',
                diff: (current: Date, date: Date) => this.dayDiff(current, date),
                rounded: (current: Date, date: Date) => this.isDayRounded(current, date)
            },
            {
                unit: 'h',
                diff: (current: Date, date: Date) => this.hourDiff(current, date),
                rounded: (current: Date, date: Date) => this.isHourRounded(current, date)
            },
            {
                unit: 'm',
                diff: (current: Date, date: Date) => this.minuteDiff(current, date),
                rounded: (current: Date, date: Date) => this.isMinuteRounded(current, date)
            },
            {
                unit: 's',
                diff: (current: Date, date: Date) => this.secondDiff(current, date),
                rounded: (current: Date, date: Date) => this.isSecondRounded(current, date)
            },
        ];

        for (const checker of checkers as StringifyChecker[]) {
            const difference: number = checker.diff(current, date);

            if (difference !== 0) {
                const differenceWithSign: string = difference > 0 ? `+${difference}`: String(difference);
                output = output.concat(`${differenceWithSign}${checker.unit}`);
            }

            const isRounded: boolean = checker.rounded(current, date);
            if (isRounded) {
                output = output.concat(`/${checker.unit}`);
                break;
            }
        }

        console.log(`
        Current: ${current.toISOString()} 
        Date: ${date.toISOString()} 
        
        Output: ${output}
        `);

        return output;
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

    private millisecondDiff(current: Date, date: Date): number {
        return date.getUTCMilliseconds() - current.getUTCMilliseconds();
    }

    private isSecondRounded(current: Date, date: Date): boolean {
        return this.millisecondDiff(current, date) == 0;
    }

    private isMinuteRounded(current: Date, date: Date): boolean {
        return this.secondDiff(current, date) == 0 && this.isSecondRounded(current, date);
    }

    private isHourRounded(current: Date, date: Date): boolean {
        return this.minuteDiff(current, date) == 0 && this.isSecondRounded(current, date);
    }

    private isDayRounded(current: Date, date: Date): boolean {
        return this.hourDiff(current, date) == 0 && this.isMinuteRounded(current, date);
    }

    private isWeekRounded(current: Date, date: Date): boolean {
        return this.dayDiff(current, date) == 0 && this.isHourRounded(current, date);
    }

    private isMonthRounded(current: Date, date: Date): boolean {
        return this.weekDiff(current, date) == 0 && this.isDayRounded(current, date);
    }

    private isYearRounded(current: Date, date: Date): boolean {
        return this.monthDiff(current, date) == 0 && this.isWeekRounded(current, date);
    }

}