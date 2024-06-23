import {TimeModifier, TimeOperator, TimeUnit} from "./time-modifier";
import {YearTimeModifier} from "./year-time-modifier";
import {MonthTimeModifier} from "./month-time-modifier";
import {DayTimeModifier} from "./day-time-modifier";
import {HourTimeModifier} from "./hour-time-modifier";
import {MinuteTimeModifier} from "./minute-time-modifier";
import {SecondTimeModifier} from "./second-time-modifier";
import {WeekTimeModifier} from "./week-time-modifier";

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