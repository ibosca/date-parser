import {TimeChecker} from "../time-checker";
import {DateChange, TimeOperator, TimeUnit} from "../../dateChange/date-change";
import {MinuteTimeChecker} from "./minute-time-checker";
import {MinuteDateChange} from "../../dateChange/timeUnit/minute-date-change";
import {HourDateChange} from "../../dateChange/timeUnit/hour-date-change";

export class HourTimeChecker extends TimeChecker{
    difference(current: Date, date: Date): DateChange | undefined {
        const isFuture = this.isFuture(current, date);

        const HOUR_IN_MS = 60 * 60 * 1000;
        const diff = Math.floor(Math.abs(current.getTime() - date.getTime()) / HOUR_IN_MS);
        return this.add(diff * (isFuture ? 1 : -1));
    }

    change(timeOperator: TimeOperator, amount?: number | undefined): DateChange {
        return new HourDateChange(timeOperator, amount);
    }

}