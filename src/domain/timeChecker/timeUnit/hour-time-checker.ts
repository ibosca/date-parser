import {TimeChecker} from "../time-checker";
import {TimeModifier, TimeOperator, TimeUnit} from "../../timeModifier/time-modifier";
import {MinuteTimeChecker} from "./minute-time-checker";
import {MinuteTimeModifier} from "../../timeModifier/timeUnit/minute-time-modifier";
import {HourTimeModifier} from "../../timeModifier/timeUnit/hour-time-modifier";

export class HourTimeChecker extends TimeChecker{
    difference(current: Date, date: Date): TimeModifier | undefined {
        const isFuture = this.isFuture(current, date);

        const HOUR_IN_MS = 60 * 60 * 1000;
        const diff = Math.floor(Math.abs(current.getTime() - date.getTime()) / HOUR_IN_MS);
        return this.addModifier(diff * (isFuture ? 1 : -1));
    }

    unit(): TimeUnit {
        return 'h';
    }

    modifier(timeOperator: TimeOperator, amount?: number | undefined): TimeModifier {
        return new HourTimeModifier(timeOperator, amount);
    }

}