import {TimeChecker} from "./time-checker";
import {TimeUnit} from "../timeModifier/time-modifier";
import {WeekTimeChecker} from "./week-time-checker";

export class MonthTimeChecker extends TimeChecker{
    difference(current: Date, date: Date): number {
        return date.getUTCMonth() - current.getUTCMonth();
    }

    unit(): TimeUnit {
        return 'M';
    }

    child(): TimeChecker {
        return new WeekTimeChecker();
    }

}