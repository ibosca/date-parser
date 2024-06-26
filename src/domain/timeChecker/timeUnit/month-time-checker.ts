import {TimeChecker} from "../time-checker";
import {DateChange, TimeOperator, TimeUnit} from "../../dateChange/date-change";
import {MonthDateChange} from "../../dateChange/timeUnit/month-date-change";

export class MonthTimeChecker extends TimeChecker{
    difference(current: Date, date: Date): DateChange | undefined {

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

    modifier(timeOperator: TimeOperator, amount?: number | undefined): DateChange {
        return new MonthDateChange(timeOperator, amount);
    }

}