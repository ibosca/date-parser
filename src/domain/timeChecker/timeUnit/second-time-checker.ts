import {TimeChecker} from "../time-checker";
import {TimeModifier, TimeOperator, TimeUnit} from "../../timeModifier/time-modifier";
import {SecondTimeModifier} from "../../timeModifier/timeUnit/second-time-modifier";

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

    modifier(timeOperator: TimeOperator, amount?: number | undefined): TimeModifier {
        return new SecondTimeModifier(timeOperator, amount);
    }



}