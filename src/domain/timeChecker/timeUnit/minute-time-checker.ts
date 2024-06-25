import {TimeChecker} from "../time-checker";
import {TimeModifier, TimeOperator, TimeUnit} from "../../timeModifier/time-modifier";
import {SecondTimeChecker} from "./second-time-checker";
import {MinuteTimeModifier} from "../../timeModifier/timeUnit/minute-time-modifier";

export class MinuteTimeChecker extends TimeChecker{
    difference(current: Date, date: Date): TimeModifier | undefined {
        const differenceAmount = date.getUTCMinutes() - current.getUTCMinutes();
        return this.addModifier(differenceAmount);
    }

    unit(): TimeUnit {
        return 'm';
    }

    modifier(timeOperator: TimeOperator, amount?: number | undefined): TimeModifier {
        return new MinuteTimeModifier(timeOperator, amount);
    }

}