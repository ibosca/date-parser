import {TimeDifferenceChecker} from "../time-difference-checker";
import {DateChange, TimeOperator, TimeUnit} from "../../dateChange/date-change";
import {DayTimeDifferenceChecker} from "./day-time-difference-checker";
import {WeekDateChange} from "../../dateChange/timeUnit/week-date-change";

export class WeekTimeDifferenceChecker extends TimeDifferenceChecker{
    difference(current: Date, date: Date): DateChange | undefined {

        const isFuture: boolean = this.isFuture(current, date);

        const WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;
        const difference: number = Math.floor(Math.abs(current.getTime() - date.getTime()) / WEEK_IN_MS);

        return this.add(difference * (isFuture ? 1 : -1));
    }

    change(timeOperator: TimeOperator, amount?: number | undefined): DateChange {
        return new WeekDateChange(timeOperator, amount);
    }

}