import {TimeChecker} from "../time-checker";
import {TimeModifier, TimeOperator, TimeUnit} from "../../timeModifier/time-modifier";
import {YearTimeModifier} from "../../timeModifier/timeUnit/year-time-modifier";

export class YearTimeChecker extends TimeChecker{
    difference(current: Date, date: Date): number {
        return date.getUTCFullYear() - current.getUTCFullYear();
    }

    unit(): TimeUnit {
        return 'y';
    }

    modifier(timeOperator: TimeOperator, amount?: number | undefined): TimeModifier {
        return new YearTimeModifier(timeOperator, amount);
    }

}