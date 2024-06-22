import {TimeChecker} from "./time-checker";
import {TimeUnit} from "../timeModifier/time-modifier";
import {MonthTimeChecker} from "./month-time-checker";

export class YearTimeChecker extends TimeChecker{
    difference(current: Date, date: Date): number {
        return date.getUTCFullYear() - current.getUTCFullYear();
    }

    unit(): TimeUnit {
        return 'y';
    }

    child(): TimeChecker {
        return new MonthTimeChecker();
    }

}