import {TimeModifier, TimeOperator, TimeUnit} from "../timeModifier/time-modifier";
import {DateString} from "../../service/date-parser";


export abstract class TimeChecker {

    public abstract unit(): TimeUnit;

    protected abstract modifier(timeOperator: TimeOperator, amount?: number | undefined): TimeModifier;

    public roundModifier(): TimeModifier {
        return this.modifier('/');
    }

    public addModifier(amount: number): TimeModifier | undefined {

        if (amount == 0) {
            return ;
        }

        return this.modifier(
          amount > 0 ? '+': '-',
          Math.abs(amount)
        );
    }

    public abstract difference(current: Date, date: Date): TimeModifier | undefined;

    public isRounded(current: Date, date: Date): boolean {

        let modifiedCurrent: Date = new Date(current);

        modifiedCurrent = this.roundModifier().apply(modifiedCurrent);

        return current.getTime() != modifiedCurrent.getTime() && date.getTime() == modifiedCurrent.getTime();
    }

    public static toString(current: Date, date: Date, checkers: TimeChecker[]): DateString {

        // console.log(`Current ${current.toISOString()}. Args: ${date.toISOString()}`)
        const modifiers: TimeModifier[] = [];
        let output = 'now';

        for (const checker of checkers) {

            const difference: TimeModifier | undefined = checker.difference(current, date);
            if (difference) {
                current = difference.applyInverse(current);
                modifiers.push(difference);
                output = output.concat(`${difference.timeOperator}${difference.timeAmount}${checker.unit()}`);
            }

            const isRounded: boolean= checker.isRounded(current, date);
            if (isRounded) {
                output = output.concat(`/${checker.unit()}`);
                break;
            }
        }

        return output;
    }
}