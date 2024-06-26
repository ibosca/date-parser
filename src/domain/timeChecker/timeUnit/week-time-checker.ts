import {TimeChecker} from "../time-checker";
import {TimeModifier, TimeOperator, TimeUnit} from "../../timeModifier/time-modifier";
import {DayTimeChecker} from "./day-time-checker";
import {WeekTimeModifier} from "../../timeModifier/timeUnit/week-time-modifier";

export class WeekTimeChecker extends TimeChecker{
    difference(current: Date, date: Date): TimeModifier | undefined {

        const isFuture: boolean = this.isFuture(current, date);

        const WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;
        const difference: number = Math.floor(Math.abs(current.getTime() - date.getTime()) / WEEK_IN_MS);

        return this.addModifier(difference * (isFuture ? 1 : -1));
    }

    unit(): TimeUnit {
        return 'w';
    }

    modifier(timeOperator: TimeOperator, amount?: number | undefined): TimeModifier {
        return new WeekTimeModifier(timeOperator, amount);
    }

}