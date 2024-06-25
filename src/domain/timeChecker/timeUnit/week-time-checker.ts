import {TimeChecker} from "../time-checker";
import {TimeModifier, TimeOperator, TimeUnit} from "../../timeModifier/time-modifier";
import {DayTimeChecker} from "./day-time-checker";
import {WeekTimeModifier} from "../../timeModifier/timeUnit/week-time-modifier";

export class WeekTimeChecker extends TimeChecker{
    difference(current: Date, date: Date): TimeModifier | undefined {

        const start: Date = this.start(current, date);
        const end: Date = this.end(current, date);
        const isFuture: boolean = this.isFuture(current, date);

        const WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;
        const difference: number = Math.floor((end.getTime() - start.getTime()) / WEEK_IN_MS) * (isFuture ? 1 : -1);

        return this.addModifier(difference);
    }

    unit(): TimeUnit {
        return 'w';
    }

    modifier(timeOperator: TimeOperator, amount?: number | undefined): TimeModifier {
        return new WeekTimeModifier(timeOperator, amount);
    }

}