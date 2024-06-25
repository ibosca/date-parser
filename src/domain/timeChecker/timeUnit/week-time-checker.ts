import {TimeChecker} from "../time-checker";
import {TimeModifier, TimeOperator, TimeUnit} from "../../timeModifier/time-modifier";
import {DayTimeChecker} from "./day-time-checker";
import {WeekTimeModifier} from "../../timeModifier/timeUnit/week-time-modifier";

export class WeekTimeChecker extends TimeChecker{
    difference(current: Date, date: Date): TimeModifier | undefined {

        const difference: number = (date.getUTCDate() - current.getUTCDate()) / 7;

        return this.addModifier(difference);
    }

    unit(): TimeUnit {
        return 'w';
    }

    modifier(timeOperator: TimeOperator, amount?: number | undefined): TimeModifier {
        return new WeekTimeModifier(timeOperator, amount);
    }

}