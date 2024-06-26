import {TimeChecker} from "../time-checker";
import {TimeModifier, TimeOperator, TimeUnit} from "../../timeModifier/time-modifier";
import {YearTimeModifier} from "../../timeModifier/timeUnit/year-time-modifier";

export class YearTimeChecker extends TimeChecker{
    difference(current: Date, date: Date): TimeModifier | undefined {
        const isFuture = this.isFuture(current, date);

        const diffDate = new Date(Math.abs(current.getTime() - date.getTime()));
        const differenceAmount: number = Math.floor(diffDate.getFullYear() - 1970);
        return this.addModifier(differenceAmount * (isFuture ? 1 : -1));
    }

    unit(): TimeUnit {
        return 'y';
    }

    modifier(timeOperator: TimeOperator, amount?: number | undefined): TimeModifier {
        return new YearTimeModifier(timeOperator, amount);
    }

}