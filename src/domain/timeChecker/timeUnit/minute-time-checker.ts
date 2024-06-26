import {TimeChecker} from "../time-checker";
import {DateChange, TimeOperator, TimeUnit} from "../../dateChange/date-change";
import {SecondTimeChecker} from "./second-time-checker";
import {MinuteDateChange} from "../../dateChange/timeUnit/minute-date-change";

export class MinuteTimeChecker extends TimeChecker{
    difference(current: Date, date: Date): DateChange | undefined {

        const isFuture = this.isFuture(current, date);

        const MIN_IN_MS = 60 * 1000;
        const differenceAmount = Math.floor(Math.abs(current.getTime() - date.getTime()) / MIN_IN_MS);
        return this.addModifier(differenceAmount * (isFuture ? 1 : -1));
    }

    modifier(timeOperator: TimeOperator, amount?: number | undefined): DateChange {
        return new MinuteDateChange(timeOperator, amount);
    }

}