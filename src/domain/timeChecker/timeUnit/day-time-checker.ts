import {TimeChecker} from "../time-checker";
import {TimeModifier, TimeOperator, TimeUnit} from "../../timeModifier/time-modifier";
import {HourTimeChecker} from "./hour-time-checker";
import {WeekTimeChecker} from "./week-time-checker";
import {HourTimeModifier} from "../../timeModifier/timeUnit/hour-time-modifier";
import {DayTimeModifier} from "../../timeModifier/timeUnit/day-time-modifier";

export class DayTimeChecker extends TimeChecker{
    difference(current: Date, date: Date): TimeModifier | undefined {
        const DAYS_IN_MS = 24 * 60 * 60 * 1000;
        const days = Math.floor((current.getTime() - date.getTime()) / DAYS_IN_MS);
        return this.addModifier(days * -1);
    }

    unit(): TimeUnit {
        return 'd';
    }

    modifier(timeOperator: TimeOperator, amount?: number | undefined): TimeModifier {
        return new DayTimeModifier(timeOperator, amount);
    }

}