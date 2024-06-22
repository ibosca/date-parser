
export type TimeOperator = '+' | '-' | '/';
export type TimeUnit = 'd' | 'M' | 'y' | 'h' | 'm' | 's' | 'w';

export abstract class TimeModifier {
    protected constructor(
        public readonly timeOperator: TimeOperator,
        public readonly timeUnit: TimeUnit,
    ) {}

    public abstract apply(date: Date): Date;

}