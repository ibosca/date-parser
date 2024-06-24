import {TimeChecker} from "../time-checker";
import {TimeModifier, TimeOperator, TimeUnit} from "../../timeModifier/time-modifier";
import {WeekTimeChecker} from "./week-time-checker";
import {MonthTimeModifier} from "../../timeModifier/timeUnit/month-time-modifier";

export class MonthTimeChecker extends TimeChecker{
    difference(current: Date, date: Date): number {
        return date.getUTCMonth() - current.getUTCMonth();
    }

    unit(): TimeUnit {
        return 'M';
    }

    modifier(timeOperator: TimeOperator, amount?: number | undefined): TimeModifier {
        return new MonthTimeModifier(timeOperator, amount);
    }

}