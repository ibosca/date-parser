import {TimeChecker} from "../time-checker";
import {TimeModifier, TimeOperator, TimeUnit} from "../../timeModifier/time-modifier";
import {SecondTimeModifier} from "../../timeModifier/timeUnit/second-time-modifier";

export class SecondTimeChecker extends TimeChecker {
    difference(current: Date, date: Date): TimeModifier | undefined {
        const start: Date = this.start(current, date);
        const end: Date = this.end(current, date);
        const isFuture = this.isFuture(current, date);

        const SEC_IN_MS = 60 * 1000;
        const differenceAmount = Math.floor((end.getTime() - start.getTime()) / SEC_IN_MS) * (isFuture ? 1 : -1);
        return this.addModifier(differenceAmount);
    }

    unit(): TimeUnit {
        return 's';
    }

    modifier(timeOperator: TimeOperator, amount?: number | undefined): TimeModifier {
        return new SecondTimeModifier(timeOperator, amount);
    }



}