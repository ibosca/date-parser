
type DateString = String;
type TimeOperator = '+' | '-' | '/';
type TimeUnit = 'd' | 'M' | 'y' | 'h' | 'm' | 's' | 'w';

interface TimeModifier {
    timeOperator: TimeOperator,
    timeUnit: TimeUnit,
    timeAmount?: number | undefined
}

export class DateParser {

    public parse(datestring: DateString): Date {
        const timeModifiers: TimeModifier[] = this.buildTimeModifiersFromDateString(datestring);

        console.log(timeModifiers);

        return timeModifiers.reduce((carry, modifier): Date => {
            return this.apply(modifier, carry);
        }, new Date());
    }
    public stringify(date: Date): DateString {
        return '';
    }

    public sum(a: number, b: number): number {
        return a + b;
    }

    private buildTimeModifiersFromDateString(datestring: DateString): TimeModifier[] {
        return [
            ...this.buildOperationalModifiers(datestring),
            ...this.buildRoundModifiers(datestring)
        ];
    }

    private buildOperationalModifiers(datestring: DateString): TimeModifier[] {
        const operationalModifiers = datestring.match(/[+-]?\d+[dMyhmsw]/) ?? [];

        return operationalModifiers.map((stringModifier): TimeModifier => {
            return {
                timeOperator: stringModifier.charAt(0) as TimeOperator,
                timeUnit: stringModifier.charAt(stringModifier.length - 1) as TimeUnit,
                timeAmount: Number(stringModifier.substring(1, stringModifier.length - 1)),
            };
        });
    }

    private buildRoundModifiers(datestring: DateString): TimeModifier[] {
        const roundModifiers = datestring.match(/\/[dMyhmsw]/) ?? [];

        return roundModifiers.map((stringModifier): TimeModifier => {
            return {
                timeOperator: stringModifier.charAt(0) as TimeOperator,
                timeUnit: stringModifier.charAt(stringModifier.length - 1) as TimeUnit,
            };
        });
    }

    private apply(timeModifier: TimeModifier, date: Date): Date {
        return date;
    }
}