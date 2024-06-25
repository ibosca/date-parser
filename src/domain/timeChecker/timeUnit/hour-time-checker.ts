import {TimeChecker} from "../time-checker";
import {TimeModifier, TimeOperator, TimeUnit} from "../../timeModifier/time-modifier";
import {MinuteTimeChecker} from "./minute-time-checker";
import {MinuteTimeModifier} from "../../timeModifier/timeUnit/minute-time-modifier";
import {HourTimeModifier} from "../../timeModifier/timeUnit/hour-time-modifier";

export class HourTimeChecker extends TimeChecker{
    difference(current: Date, date: Date): TimeModifier | undefined {
        const start: Date = this.start(current, date);
        const end: Date = this.end(current, date);
        const isFuture = this.isFuture(current, date);

        const HOUR_IN_MS = 60 * 60 * 1000;
        const diff = Math.floor((end.getTime() - start.getTime()) / HOUR_IN_MS) * (isFuture ? 1 : -1);
        return this.addModifier(diff * -1);
    }

    unit(): TimeUnit {
        return 'h';
    }

    modifier(timeOperator: TimeOperator, amount?: number | undefined): TimeModifier {
        return new HourTimeModifier(timeOperator, amount);
    }

}