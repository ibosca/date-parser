import {TimeDifferenceChecker} from "../time-difference-checker";
import {DateChange, TimeOperator, TimeUnit} from "../../dateChange/date-change";
import {SecondTimeDifferenceChecker} from "./second-time-difference-checker";
import {MinuteDateChange} from "../../dateChange/timeUnit/minute-date-change";

export class MinuteTimeDifferenceChecker extends TimeDifferenceChecker{
    difference(current: Date, date: Date): DateChange | undefined {

        const isFuture = this.isFuture(current, date);

        const MIN_IN_MS = 60 * 1000;
        const differenceAmount = Math.floor(Math.abs(current.getTime() - date.getTime()) / MIN_IN_MS);
        return this.add(differenceAmount * (isFuture ? 1 : -1));
    }

    change(timeOperator: TimeOperator, amount?: number | undefined): DateChange {
        return new MinuteDateChange(timeOperator, amount);
    }

}