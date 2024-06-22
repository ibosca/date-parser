import {TimeChecker} from "./time-checker";
import {TimeUnit} from "../timeModifier/time-modifier";
import {DayTimeChecker} from "./day-time-checker";

export class WeekTimeChecker extends TimeChecker{
    difference(current: Date, date: Date): number {
        return (date.getUTCDate() - current.getUTCDate()) / 7;
    }

    unit(): TimeUnit {
        return 'w';
    }

    child(): TimeChecker {
        return new DayTimeChecker();
    }

}