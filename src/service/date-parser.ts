import {DateChange} from "../domain/dateChange/date-change";
import {DateChangeExtractor} from "../domain/dateChange/date-change-extractor";
import {TimeChecker} from "../domain/timeChecker/time-checker";
import {YearTimeChecker} from "../domain/timeChecker/timeUnit/year-time-checker";
import {MonthTimeChecker} from "../domain/timeChecker/timeUnit/month-time-checker";
import {WeekTimeChecker} from "../domain/timeChecker/timeUnit/week-time-checker";
import {DayTimeChecker} from "../domain/timeChecker/timeUnit/day-time-checker";
import {HourTimeChecker} from "../domain/timeChecker/timeUnit/hour-time-checker";
import {MinuteTimeChecker} from "../domain/timeChecker/timeUnit/minute-time-checker";
import {SecondTimeChecker} from "../domain/timeChecker/timeUnit/second-time-checker";

export type DateString = String;



export class DateParser {

    constructor(
        private readonly dateChangeExtractor: DateChangeExtractor,
    ) {}

    public parse(datestring: DateString): Date {
        const timeModifiers: DateChange[] = this.dateChangeExtractor.extract(datestring);

        return timeModifiers.reduce((carry, modifier): Date => {
            return modifier.apply(carry);
        }, new Date());
    }
    public stringify(date: Date): DateString {
        let current = new Date();

        const checkers: TimeChecker[] = [
            new YearTimeChecker(),
            new MonthTimeChecker(),
            new WeekTimeChecker(),
            new DayTimeChecker(),
            new HourTimeChecker(),
            new MinuteTimeChecker(),
            new SecondTimeChecker()
        ];

        const differences: DateChange[] = [];

        for (const checker of checkers) {

            const difference: DateChange | undefined = checker.difference(current, date);
            if (difference) {
                differences.push(difference);
                current = difference.apply(current);
            }

            const isRounded: DateChange | undefined = checker.isRounded(current, date);
            if (isRounded) {
                differences.push(isRounded);
                break;
            }
        }

        return differences.reduce((carry, current): string => {
            return carry + current.toString();
        }, 'now');
    }



}