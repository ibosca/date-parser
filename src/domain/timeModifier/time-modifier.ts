
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

    public abstract modify(date: Date, amount: number): Date;

    public abstract round(date: Date): Date;

}