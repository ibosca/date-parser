import {TimeModifier, TimeOperator, TimeUnit} from "../timeModifier/time-modifier";
import {DateString} from "../../service/date-parser";


export abstract class TimeChecker {

    public abstract unit(): TimeUnit;

    protected abstract modifier(timeOperator: TimeOperator, amount?: number | undefined): TimeModifier;

    protected roundModifier(): TimeModifier {
        return this.modifier('/');
    }

    protected addModifier(amount: number): TimeModifier | undefined {

        if (amount == 0) {
            return ;
        }

        return this.modifier(
          amount > 0 ? '+': '-',
          amount
        );
    }

    public abstract difference(current: Date, date: Date): TimeModifier | undefined;

    public isRounded(current: Date, date: Date): TimeModifier | undefined {

        let modifiedCurrent: Date = new Date(current);

        modifiedCurrent = this.roundModifier().apply(modifiedCurrent);

        const isRounded: boolean = current.getTime() != modifiedCurrent.getTime() && date.getTime() == modifiedCurrent.getTime();

        if (!isRounded) {
            return;
        }

        return this.roundModifier();
    }

    public static toString(current: Date, date: Date, checkers: TimeChecker[]): DateString {

        // console.log(`Current ${current.toISOString()}. Args: ${date.toISOString()}`)
        const differences: TimeModifier[] = [];

        for (const checker of checkers) {

            const difference: TimeModifier | undefined = checker.difference(current, date);
            if (difference) {
                differences.push(difference);
                current = difference.apply(current);
            }

            const isRounded: TimeModifier | undefined = checker.isRounded(current, date);
            if (isRounded) {
                differences.push(isRounded);
                break;
            }
        }

        return differences.reduce((carry, current): string => {
            return carry + current.toString();
        }, 'now');
    }

    public start(a: Date, b: Date): Date {
        return a > b ? b: a;
    }

    public end(a: Date, b: Date): Date {
        return a > b ? a: b;
    }

    public isFuture(now: Date, date: Date): boolean {
        return date > now;
    }
}