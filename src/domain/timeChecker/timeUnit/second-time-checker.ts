import {TimeChecker} from "../time-checker";
import {DateChange, TimeOperator, TimeUnit} from "../../dateChange/date-change";
import {SecondDateChange} from "../../dateChange/timeUnit/second-date-change";

export class SecondTimeChecker extends TimeChecker {
    difference(current: Date, date: Date): DateChange | undefined {
        const isFuture = this.isFuture(current, date);

        const SEC_IN_MS = 60 * 1000;
        const differenceAmount = Math.floor(Math.abs(current.getTime() - date.getTime()) / SEC_IN_MS);
        return this.addModifier(differenceAmount * (isFuture ? 1 : -1));
    }

    modifier(timeOperator: TimeOperator, amount?: number | undefined): DateChange {
        return new SecondDateChange(timeOperator, amount);
    }



}