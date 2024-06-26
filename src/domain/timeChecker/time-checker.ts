import {DateChange, TimeOperator, TimeUnit} from "../dateChange/date-change";
import {DateString} from "../../service/date-parser";


export abstract class TimeChecker {

    protected abstract change(timeOperator: TimeOperator, amount?: number | undefined): DateChange;

    protected round(): DateChange {
        return this.change('/');
    }

    protected add(amount: number): DateChange | undefined {

        if (amount == 0) {
            return ;
        }

        return this.change(
          amount > 0 ? '+': '-',
          amount
        );
    }

    public abstract difference(current: Date, date: Date): DateChange | undefined;

    public isRounded(current: Date, date: Date): DateChange | undefined {

        let modifiedCurrent: Date = new Date(current);

        modifiedCurrent = this.round().apply(modifiedCurrent);

        const isRounded: boolean = current.getTime() != modifiedCurrent.getTime() && date.getTime() == modifiedCurrent.getTime();

        if (!isRounded) {
            return;
        }

        return this.round();
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