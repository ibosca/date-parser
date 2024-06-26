import {DateChange, TimeOperator, TimeUnit} from "../dateChange/date-change";
import {DateString} from "../../service/date-parser";


export abstract class TimeChecker {

    protected abstract modifier(timeOperator: TimeOperator, amount?: number | undefined): DateChange;

    protected roundModifier(): DateChange {
        return this.modifier('/');
    }

    protected addModifier(amount: number): DateChange | undefined {

        if (amount == 0) {
            return ;
        }

        return this.modifier(
          amount > 0 ? '+': '-',
          amount
        );
    }

    public abstract difference(current: Date, date: Date): DateChange | undefined;

    public isRounded(current: Date, date: Date): DateChange | undefined {

        let modifiedCurrent: Date = new Date(current);

        modifiedCurrent = this.roundModifier().apply(modifiedCurrent);

        const isRounded: boolean = current.getTime() != modifiedCurrent.getTime() && date.getTime() == modifiedCurrent.getTime();

        if (!isRounded) {
            return;
        }

        return this.roundModifier();
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