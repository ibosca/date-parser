
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
        const output: Date = new Date();
        const timeModifiers: TimeModifier[] = this.buildTimeModifiersFromDateString(datestring);
        return timeModifiers.reduce((carry, modifier): Date => {
            return this.apply(modifier, carry);
        }, output);
    }
    public stringify(date: Date): DateString {
        return '';
    }

    public sum(a: number, b: number): number {
        return a + b;
    }

    private buildTimeModifiersFromDateString(datestring: DateString): TimeModifier[] {
        const operationalModifiers = datestring.match(/[+-]?\d+[dMyhmsw]/);
        console.log(operationalModifiers);

        const roundModifiers = datestring.match(/\/[dMyhmsw]/);
        console.log(roundModifiers);


        return [];
    }

    private apply(timeModifier: TimeModifier, date: Date): Date {
        return date;
    }
}