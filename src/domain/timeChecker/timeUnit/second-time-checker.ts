import {TimeChecker} from "../time-checker";
import {TimeModifier, TimeOperator, TimeUnit} from "../../timeModifier/time-modifier";
import {SecondTimeModifier} from "../../timeModifier/timeUnit/second-time-modifier";

export class SecondTimeChecker extends TimeChecker {
    difference(current: Date, date: Date): TimeModifier | undefined {
        const differenceAmount = date.getUTCSeconds() - current.getUTCSeconds();
        return this.addModifier(differenceAmount);
    }

    unit(): TimeUnit {
        return 's';
    }

    modifier(timeOperator: TimeOperator, amount?: number | undefined): TimeModifier {
        return new SecondTimeModifier(timeOperator, amount);
    }



}