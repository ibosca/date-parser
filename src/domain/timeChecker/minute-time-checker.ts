import {TimeChecker} from "./time-checker";
import {TimeUnit} from "../timeModifier/time-modifier";
import {SecondTimeChecker} from "./second-time-checker";

export class MinuteTimeChecker extends TimeChecker{
    difference(current: Date, date: Date): number {
        return date.getUTCMinutes() - current.getUTCMinutes();
    }

    unit(): TimeUnit {
        return 'm';
    }

    child(): TimeChecker {
        return new SecondTimeChecker();
    }

}