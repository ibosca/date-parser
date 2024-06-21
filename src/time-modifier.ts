
export type TimeOperator = '+' | '-' | '/';
export type TimeUnit = 'd' | 'M' | 'y' | 'h' | 'm' | 's' | 'w';

export class TimeModifier {
    constructor(
        public readonly timeOperator: TimeOperator,
        public readonly timeUnit: TimeUnit,
        public readonly timeAmount?: number | undefined
    ) {}
}