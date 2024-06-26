import {DateChange} from "../domain/dateChange/date-change";
import {DateChangeExtractor} from "../domain/dateChange/date-change-extractor";
import {TimeDifferenceChecker} from "../domain/timeDifferenceChecker/time-difference-checker";
import {YearTimeDifferenceChecker} from "../domain/timeDifferenceChecker/timeUnit/year-time-difference-checker";
import {MonthTimeDifferenceChecker} from "../domain/timeDifferenceChecker/timeUnit/month-time-difference-checker";
import {WeekTimeDifferenceChecker} from "../domain/timeDifferenceChecker/timeUnit/week-time-difference-checker";
import {DayTimeDifferenceChecker} from "../domain/timeDifferenceChecker/timeUnit/day-time-difference-checker";
import {HourTimeDifferenceChecker} from "../domain/timeDifferenceChecker/timeUnit/hour-time-difference-checker";
import {MinuteTimeDifferenceChecker} from "../domain/timeDifferenceChecker/timeUnit/minute-time-difference-checker";
import {SecondTimeDifferenceChecker} from "../domain/timeDifferenceChecker/timeUnit/second-time-difference-checker";

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

        const checkers: TimeDifferenceChecker[] = [
            new YearTimeDifferenceChecker(),
            new MonthTimeDifferenceChecker(),
            new WeekTimeDifferenceChecker(),
            new DayTimeDifferenceChecker(),
            new HourTimeDifferenceChecker(),
            new MinuteTimeDifferenceChecker(),
            new SecondTimeDifferenceChecker()
        ];

        const differences: DateChange[] = [];
        let current = new Date();

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