import {TimeChecker} from "./time-checker";
import {TimeUnit} from "../timeModifier/time-modifier";
import {MinuteTimeChecker} from "./minute-time-checker";

export class HourTimeChecker extends TimeChecker{
    difference(current: Date, date: Date): number {
        return date.getUTCHours() - current.getUTCHours();
    }

    unit(): TimeUnit {
        return 'h';
    }

    child(): TimeChecker {
        return new MinuteTimeChecker();
    }

}