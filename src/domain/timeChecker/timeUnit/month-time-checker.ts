import {TimeChecker} from "../time-checker";
import {TimeModifier, TimeOperator, TimeUnit} from "../../timeModifier/time-modifier";
import {WeekTimeChecker} from "./week-time-checker";
import {MonthTimeModifier} from "../../timeModifier/timeUnit/month-time-modifier";

export class MonthTimeChecker extends TimeChecker{
    difference(current: Date, date: Date): TimeModifier | undefined {
        console.log(`Current ${current.toISOString()}. Args: ${date.toISOString()}`);

        const dayDiff = current.getUTCDate() - date.getUTCDate()
        let onYearDifference: number = current.getUTCMonth() - date.getUTCMonth();

        if (dayDiff < 0) {
            onYearDifference = onYearDifference -1;
        }
        console.log(onYearDifference);
        const nonCurrentYearDifference: number = 12 * (current.getUTCFullYear() - date.getUTCFullYear());
        console.log(nonCurrentYearDifference);
        return this.addModifier((onYearDifference + nonCurrentYearDifference) * -1 );
    }

    unit(): TimeUnit {
        return 'M';
    }

    modifier(timeOperator: TimeOperator, amount?: number | undefined): TimeModifier {
        return new MonthTimeModifier(timeOperator, amount);
    }

}