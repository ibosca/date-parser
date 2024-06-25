import {TimeChecker} from "../time-checker";
import {TimeModifier, TimeOperator, TimeUnit} from "../../timeModifier/time-modifier";
import {WeekTimeChecker} from "./week-time-checker";
import {MonthTimeModifier} from "../../timeModifier/timeUnit/month-time-modifier";

export class MonthTimeChecker extends TimeChecker{
    difference(current: Date, date: Date): TimeModifier | undefined {
        console.log(`Current: ${current.toISOString()}; Arg: ${date.toISOString()}`)
        const onYearDifference: number = current.getUTCMonth() - date.getUTCMonth();
        const nonCurrentYearDifference: number = 12 * (current.getUTCFullYear() - date.getUTCFullYear());
        return this.addModifier((onYearDifference + nonCurrentYearDifference) * -1 );
    }

    unit(): TimeUnit {
        return 'M';
    }

    modifier(timeOperator: TimeOperator, amount?: number | undefined): TimeModifier {
        return new MonthTimeModifier(timeOperator, amount);
    }

}