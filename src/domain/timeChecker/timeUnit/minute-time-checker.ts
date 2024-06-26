import {TimeChecker} from "../time-checker";
import {TimeModifier, TimeOperator, TimeUnit} from "../../timeModifier/time-modifier";
import {SecondTimeChecker} from "./second-time-checker";
import {MinuteTimeModifier} from "../../timeModifier/timeUnit/minute-time-modifier";

export class MinuteTimeChecker extends TimeChecker{
    difference(current: Date, date: Date): TimeModifier | undefined {

        const isFuture = this.isFuture(current, date);

        const MIN_IN_MS = 60 * 1000;
        const differenceAmount = Math.floor(Math.abs(current.getTime() - date.getTime()) / MIN_IN_MS);
        return this.addModifier(differenceAmount * (isFuture ? 1 : -1));
    }

    unit(): TimeUnit {
        return 'm';
    }

    modifier(timeOperator: TimeOperator, amount?: number | undefined): TimeModifier {
        return new MinuteTimeModifier(timeOperator, amount);
    }

}