import {DateChange, TimeOperator, TimeUnit} from "./date-change";
import {YearDateChange} from "./timeUnit/year-date-change";
import {MonthDateChange} from "./timeUnit/month-date-change";
import {DayDateChange} from "./timeUnit/day-date-change";
import {HourDateChange} from "./timeUnit/hour-date-change";
import {MinuteDateChange} from "./timeUnit/minute-date-change";
import {SecondDateChange} from "./timeUnit/second-date-change";
import {WeekDateChange} from "./timeUnit/week-date-change";

export class DateChangeFactory {

    public static build(operator: TimeOperator, unit: TimeUnit, amount?: number | undefined): DateChange {
        switch (unit) {
            case 'y':
                return new YearDateChange(operator, amount);
            case 'M':
                return new MonthDateChange(operator, amount);
            case 'd':
                return new DayDateChange(operator, amount);
            case 'h':
                return new HourDateChange(operator, amount);
            case 'm':
                return new MinuteDateChange(operator, amount);
            case 's':
                return new SecondDateChange(operator, amount)
            case 'w':
                return new WeekDateChange(operator, amount);
            default:
                throw new Error('Time unit provided is not supported!');
        }
    }

}