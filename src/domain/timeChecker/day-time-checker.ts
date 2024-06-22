import {TimeChecker} from "./time-checker";
import {TimeUnit} from "../timeModifier/time-modifier";
import {HourTimeChecker} from "./hour-time-checker";
import {WeekTimeChecker} from "./week-time-checker";

export class DayTimeChecker extends TimeChecker{
    difference(current: Date, date: Date): number {
        const days = (date.getUTCDate() - current.getUTCDate()) - (new WeekTimeChecker()).difference(current, date) * 7;
        return days > 0 ? days : 0;
    }

    unit(): TimeUnit {
        return 'd';
    }

    child(): TimeChecker {
        return new HourTimeChecker();
    }

}