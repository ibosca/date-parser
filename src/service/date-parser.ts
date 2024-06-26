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
        private readonly timeModifierExtractor: DateChangeExtractor,
    ) {}

    public parse(datestring: DateString): Date {
        const timeModifiers: DateChange[] = this.timeModifierExtractor.extract(datestring);

        return timeModifiers.reduce((carry, modifier): Date => {
            return modifier.apply(carry);
        }, new Date());
    }
    public stringify(date: Date): DateString {
        const current = new Date();

        const output = TimeChecker.toString(current, date, [
            new YearTimeChecker(),
            new MonthTimeChecker(),
            new WeekTimeChecker(),
            new DayTimeChecker(),
            new HourTimeChecker(),
            new MinuteTimeChecker(),
            new SecondTimeChecker()
        ]);

        console.log(`
        Current: ${current.toISOString()} 
        Date: ${date.toISOString()} 
        
        Output: ${output}
        `);

        return output;
    }



}