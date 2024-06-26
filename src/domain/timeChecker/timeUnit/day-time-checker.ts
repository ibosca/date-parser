import {TimeChecker} from "../time-checker";
import {DateChange, TimeOperator, TimeUnit} from "../../dateChange/date-change";
import {HourTimeChecker} from "./hour-time-checker";
import {WeekTimeChecker} from "./week-time-checker";
import {HourDateChange} from "../../dateChange/timeUnit/hour-date-change";
import {DayDateChange} from "../../dateChange/timeUnit/day-date-change";

export class DayTimeChecker extends TimeChecker{
    difference(current: Date, date: Date): DateChange | undefined {
        const isFuture = this.isFuture(current, date);

        const DAYS_IN_MS = 24 * 60 * 60 * 1000;
        const days = Math.floor(Math.abs((current.getTime() - date.getTime()) / DAYS_IN_MS));
        return this.addModifier(days * (isFuture ? 1 : -1));
    }

    modifier(timeOperator: TimeOperator, amount?: number | undefined): DateChange {
        return new DayDateChange(timeOperator, amount);
    }

}