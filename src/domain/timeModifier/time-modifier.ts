
export type TimeOperator = '+' | '-' | '/';
export type TimeUnit = 'd' | 'M' | 'y' | 'h' | 'm' | 's' | 'w';

export abstract class TimeModifier {
    constructor(
        public readonly timeOperator: TimeOperator,
        public readonly timeAmount?: number | undefined,
    ) {}

    protected isRoundOperation(): boolean {
        return this.timeOperator == '/' && !this.timeAmount
    }

    public apply(date: Date): Date {
        return this.isRoundOperation()
            ? this.round(date)
            : this.modify(date, this.timeAmount!);
    }

    public toString(): string {

        if (this.isRoundOperation()) {
            return `${this.timeOperator}${this.unit()}`
        }

        return `${this.timeOperator}${Math.abs(this.timeAmount!)}${this.unit()}`
    }



    protected abstract modify(date: Date, amount: number): Date;

    protected abstract round(date: Date): Date;

    public abstract unit(): TimeUnit;

}