import {TimeChecker} from "../time-checker";
import {TimeModifier, TimeOperator, TimeUnit} from "../../timeModifier/time-modifier";
import {DayTimeChecker} from "./day-time-checker";
import {WeekTimeModifier} from "../../timeModifier/timeUnit/week-time-modifier";

export class WeekTimeChecker extends TimeChecker{
    difference(current: Date, date: Date): number {
        return (date.getUTCDate() - current.getUTCDate()) / 7;
    }

    unit(): TimeUnit {
        return 'w';
    }

    modifier(timeOperator: TimeOperator, amount?: number | undefined): TimeModifier {
        return new WeekTimeModifier(timeOperator, amount);
    }

}