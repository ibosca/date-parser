import {TimeChecker} from "../time-checker";
import {TimeModifier, TimeOperator, TimeUnit} from "../../timeModifier/time-modifier";
import {HourTimeChecker} from "./hour-time-checker";
import {WeekTimeChecker} from "./week-time-checker";
import {HourTimeModifier} from "../../timeModifier/timeUnit/hour-time-modifier";

export class DayTimeChecker extends TimeChecker{
    difference(current: Date, date: Date): TimeModifier | undefined {
        const days = (date.getUTCDate() - current.getUTCDate()) - ((new WeekTimeChecker()).difference(current, date)?.timeAmount || 0) * 7;
        return this.addModifier(days);
    }

    unit(): TimeUnit {
        return 'd';
    }

    modifier(timeOperator: TimeOperator, amount?: number | undefined): TimeModifier {
        return new HourTimeModifier(timeOperator, amount);
    }

}