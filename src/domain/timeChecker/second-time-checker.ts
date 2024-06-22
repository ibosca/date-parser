import {TimeChecker} from "./time-checker";
import {TimeUnit} from "../timeModifier/time-modifier";

export class SecondTimeChecker extends TimeChecker {
    difference(current: Date, date: Date): number {
        return date.getUTCSeconds() - current.getUTCSeconds();
    }

    isRounded(current: Date, date: Date): boolean {
        return (date.getUTCMilliseconds() - current.getUTCMilliseconds()) == 0;
    }

    unit(): TimeUnit {
        return 's';
    }

    child(): TimeChecker {
        throw new Error('I have no children');
    }



}