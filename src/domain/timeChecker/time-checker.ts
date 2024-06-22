import {TimeUnit} from "../timeModifier/time-modifier";
import {DateString} from "../../service/date-parser";


export abstract class TimeChecker {

    public abstract unit(): TimeUnit;

    public abstract child(): TimeChecker;

    public abstract difference(current: Date, date: Date): number;

    public isRounded(current: Date, date: Date): boolean {
        return this.difference(current, date) == 0 && this.child().isRounded(current, date);
    }

    public static toString(current: Date, date: Date, checkers: TimeChecker[]): DateString {

        let output = 'now';

        for (const checker of checkers) {
            const difference: number = checker.difference(current, date);

            if (difference !== 0) {
                const differenceWithSign: string = difference > 0 ? `+${difference}`: String(difference);
                output = output.concat(`${differenceWithSign}${checker.unit()}`);
            }

            const isRounded: boolean = checker.isRounded(current, date);
            if (isRounded) {
                output = output.concat(`/${checker.unit()}`);
                break;
            }
        }

        return output;
    }
}