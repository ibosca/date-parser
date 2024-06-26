import {TimeDifferenceChecker} from "../time-difference-checker";
import {DateChange, TimeOperator, TimeUnit} from "../../dateChange/date-change";
import {HourTimeDifferenceChecker} from "./hour-time-difference-checker";
import {WeekTimeDifferenceChecker} from "./week-time-difference-checker";
import {HourDateChange} from "../../dateChange/timeUnit/hour-date-change";
import {DayDateChange} from "../../dateChange/timeUnit/day-date-change";

export class DayTimeDifferenceChecker extends TimeDifferenceChecker{
    difference(current: Date, date: Date): DateChange | undefined {
        const isFuture = this.isFuture(current, date);

        const DAYS_IN_MS = 24 * 60 * 60 * 1000;
        const days = Math.floor(Math.abs((current.getTime() - date.getTime()) / DAYS_IN_MS));
        return this.add(days * (isFuture ? 1 : -1));
    }

    change(timeOperator: TimeOperator, amount?: number | undefined): DateChange {
        return new DayDateChange(timeOperator, amount);
    }

}