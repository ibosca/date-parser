import {TimeChecker} from "../time-checker";
import {DateChange, TimeOperator, TimeUnit} from "../../dateChange/date-change";
import {YearDateChange} from "../../dateChange/timeUnit/year-date-change";

export class YearTimeChecker extends TimeChecker{
    difference(current: Date, date: Date): DateChange | undefined {
        const isFuture = this.isFuture(current, date);

        const diffDate = new Date(Math.abs(current.getTime() - date.getTime()));
        const differenceAmount: number = Math.floor(diffDate.getFullYear() - 1970);
        return this.addModifier(differenceAmount * (isFuture ? 1 : -1));
    }

    modifier(timeOperator: TimeOperator, amount?: number | undefined): DateChange {
        return new YearDateChange(timeOperator, amount);
    }

}