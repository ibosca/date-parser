import {TimeChecker} from "../time-checker";
import {TimeModifier, TimeOperator, TimeUnit} from "../../timeModifier/time-modifier";
import {MinuteTimeChecker} from "./minute-time-checker";
import {MinuteTimeModifier} from "../../timeModifier/timeUnit/minute-time-modifier";
import {HourTimeModifier} from "../../timeModifier/timeUnit/hour-time-modifier";

export class HourTimeChecker extends TimeChecker{
    difference(current: Date, date: Date): TimeModifier | undefined {
        const differenceAmount = date.getUTCHours() - current.getUTCHours();
        return this.addModifier(differenceAmount);
    }

    unit(): TimeUnit {
        return 'h';
    }

    modifier(timeOperator: TimeOperator, amount?: number | undefined): TimeModifier {
        return new HourTimeModifier(timeOperator, amount);
    }

}