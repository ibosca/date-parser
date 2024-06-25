import {TimeChecker} from "../time-checker";
import {TimeModifier, TimeOperator, TimeUnit} from "../../timeModifier/time-modifier";
import {YearTimeModifier} from "../../timeModifier/timeUnit/year-time-modifier";

export class YearTimeChecker extends TimeChecker{
    difference(current: Date, date: Date): TimeModifier | undefined{
        const diffDate = new Date(current.getTime() - date.getTime());
        const differenceAmount: number = (diffDate.getFullYear() - 1970) * -1;
        return this.addModifier(differenceAmount);
    }

    unit(): TimeUnit {
        return 'y';
    }

    modifier(timeOperator: TimeOperator, amount?: number | undefined): TimeModifier {
        return new YearTimeModifier(timeOperator, amount);
    }

}