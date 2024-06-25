
export type TimeOperator = '+' | '-' | '/';
export type TimeUnit = 'd' | 'M' | 'y' | 'h' | 'm' | 's' | 'w';

export abstract class TimeModifier {
    constructor(
        public readonly timeOperator: TimeOperator,
        public readonly timeAmount?: number | undefined,
    ) {}

    public isRoundOperation(): boolean {
        return this.timeOperator == '/' && !this.timeAmount
    }

    public apply(date: Date): Date {
        return this.isRoundOperation()
            ? this.round(date)
            : this.modify(date, this.timeAmount!);
    }

    public applyInverse(date: Date): Date {
        if (this.isRoundOperation()) {
            throw new Error('Not possible to reverse round operation');
        }

        return this.modify(date, this.timeAmount! * -1);
    }



    protected abstract modify(date: Date, amount: number): Date;

    protected abstract round(date: Date): Date;

}