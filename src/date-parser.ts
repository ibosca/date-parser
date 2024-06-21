
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
        if (this.isAdditionModifier(timeModifier) || this.isSubstractModifier(timeModifier)) {
            return this.applyOperationModifier(timeModifier, date);
        }

        return this.applyRoundModifier(timeModifier, date);
    }

    private isAdditionModifier(timeModifier: TimeModifier): boolean {
        return timeModifier.timeOperator == "+";
    }

    private isSubstractModifier(timeModifier: TimeModifier): boolean {
        return timeModifier.timeOperator == "-";
    }

    private applyOperationModifier(timeModifier: TimeModifier, date: Date): Date {

        const timeAmount: number = Number(`${timeModifier.timeOperator}${timeModifier.timeAmount!}`);

        const operations: { [key: string]: (amount: number) => void } = {
            "d": (amount: number) => date.setDate(date.getDate() + amount),
            "M": (amount: number) => date.setMonth(date.getMonth() + amount),
            "y": (amount: number) => date.setFullYear(date.getFullYear() + amount),
            "h": (amount: number) => date.setHours(date.getHours() + amount),
            "m": (amount: number) => date.setMinutes(date.getMinutes() + amount),
            "s": (amount: number) => date.setSeconds(date.getSeconds() + amount),
            "w": (amount: number) => date.setDate(date.getDate() + amount * 7)
        };

        const operation = operations[timeModifier.timeUnit];
        if (!operation) {
            throw new Error('Wrong time unit provided!')
        }

        operation(timeAmount);
        return date;
    }

    private applyRoundModifier(timeModifier: TimeModifier, date: Date): Date {
        return date;
    }
}