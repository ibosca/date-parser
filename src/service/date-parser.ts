import {TimeModifier} from "../domain/timeModifier/time-modifier";
import {TimeModifierExtractor} from "./time-modifier-extractor";
import {TimeChecker} from "../domain/timeChecker/time-checker";
import {YearTimeChecker} from "../domain/timeChecker/year-time-checker";
import {MonthTimeChecker} from "../domain/timeChecker/month-time-checker";
import {WeekTimeChecker} from "../domain/timeChecker/week-time-checker";
import {DayTimeChecker} from "../domain/timeChecker/day-time-checker";
import {HourTimeChecker} from "../domain/timeChecker/hour-time-checker";
import {MinuteTimeChecker} from "../domain/timeChecker/minute-time-checker";
import {SecondTimeChecker} from "../domain/timeChecker/second-time-checker";

export type DateString = String;



export class DateParser {

    constructor(
        private readonly timeModifierExtractor: TimeModifierExtractor,
    ) {}

    public parse(datestring: DateString): Date {
        const timeModifiers: TimeModifier[] = this.timeModifierExtractor.extract(datestring);

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