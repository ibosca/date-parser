import {TimeChecker} from "../time-checker";
import {TimeModifier, TimeOperator, TimeUnit} from "../../timeModifier/time-modifier";
import {MonthTimeModifier} from "../../timeModifier/timeUnit/month-time-modifier";

export class MonthTimeChecker extends TimeChecker{
    difference(current: Date, date: Date): TimeModifier | undefined {

        const start: Date = this.start(current, date);
        const end: Date = this.end(current, date);
        const isFuture: boolean = this.isFuture(current, date);

        const dayDiff = end.getUTCDate() - start.getUTCDate()
        let onYearDifference: number = end.getUTCMonth() - start.getUTCMonth();

        if (dayDiff < 0) {
            onYearDifference = onYearDifference - 1;
        }

        const nonCurrentYearDifference: number = 12 * (end.getUTCFullYear() - start.getUTCFullYear());
        return this.addModifier((onYearDifference + nonCurrentYearDifference) * (isFuture ? 1 : -1));
    }

    unit(): TimeUnit {
        return 'M';
    }

    modifier(timeOperator: TimeOperator, amount?: number | undefined): TimeModifier {
        return new MonthTimeModifier(timeOperator, amount);
    }

}