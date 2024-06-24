import {TimeModifier, TimeOperator, TimeUnit} from "./time-modifier";
import {YearTimeModifier} from "./timeUnit/year-time-modifier";
import {MonthTimeModifier} from "./timeUnit/month-time-modifier";
import {DayTimeModifier} from "./timeUnit/day-time-modifier";
import {HourTimeModifier} from "./timeUnit/hour-time-modifier";
import {MinuteTimeModifier} from "./timeUnit/minute-time-modifier";
import {SecondTimeModifier} from "./timeUnit/second-time-modifier";
import {WeekTimeModifier} from "./timeUnit/week-time-modifier";

export class TimeModifierFactory {

    public static build(operator: TimeOperator, unit: TimeUnit, amount?: number | undefined): TimeModifier {
        switch (unit) {
            case 'y':
                return new YearTimeModifier(operator, amount);
            case 'M':
                return new MonthTimeModifier(operator, amount);
            case 'd':
                return new DayTimeModifier(operator, amount);
            case 'h':
                return new HourTimeModifier(operator, amount);
            case 'm':
                return new MinuteTimeModifier(operator, amount);
            case 's':
                return new SecondTimeModifier(operator, amount)
            case 'w':
                return new WeekTimeModifier(operator, amount);
            default:
                throw new Error('Time unit provided is not supported!');
        }
    }

}