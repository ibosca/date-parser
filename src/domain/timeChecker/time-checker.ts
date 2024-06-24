import {TimeModifier, TimeOperator, TimeUnit} from "../timeModifier/time-modifier";
import {DateString} from "../../service/date-parser";


export abstract class TimeChecker {

    public abstract unit(): TimeUnit;

    public abstract modifier(timeOperator: TimeOperator, amount?: number | undefined): TimeModifier;

    public abstract difference(current: Date, date: Date): number;

    public isRounded(current: Date, date: Date, modifier: TimeModifier | undefined): boolean {
        current = modifier ? modifier.apply(current): current;
        current = this.modifier('/').apply(current);

        return date.getTime() == current.getTime();
    }

    public static toString(current: Date, date: Date, checkers: TimeChecker[]): DateString {

        let output = 'now';

        for (const checker of checkers) {

            date = new Date(date);
            current = new Date(current);

            const difference: number = checker.difference(current, date);
            const sign: TimeOperator = difference > 0 ? "+": "-";

            if (difference !== 0) {
                const differenceWithSign: string = `${sign}${Math.abs(difference)}`;
                output = output.concat(`${differenceWithSign}${checker.unit()}`);
            }

            const modifier = checker.modifier(sign, difference);
            const isRounded: boolean = checker.isRounded(current, date, modifier);
            if (isRounded) {
                output = output.concat(`/${checker.unit()}`);
                break;
            }
        }

        return output;
    }
}