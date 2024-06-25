import {TimeChecker} from "../time-checker";
import {TimeModifier, TimeOperator, TimeUnit} from "../../timeModifier/time-modifier";
import {WeekTimeChecker} from "./week-time-checker";
import {MonthTimeModifier} from "../../timeModifier/timeUnit/month-time-modifier";

export class MonthTimeChecker extends TimeChecker{
    difference(current: Date, date: Date): TimeModifier | undefined {
        const differenceAmount = current.getUTCMonth() - date.getUTCMonth() - 1;
        return this.addModifier(differenceAmount);
    }

    unit(): TimeUnit {
        return 'M';
    }

    modifier(timeOperator: TimeOperator, amount?: number | undefined): TimeModifier {
        return new MonthTimeModifier(timeOperator, amount);
    }

}