
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
        if (this.isAdditionModifier(timeModifier)) {
            return this.applyOperationModifier(timeModifier, date);
        }

        if (this.isSubstractModifier(timeModifier)) {
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

        switch (timeModifier.timeUnit) {
            case "d":
                date.setDate(date.getDate() + timeAmount);
                break;
            case "M":
                date.setMonth(date.getMonth() + timeAmount);
                break;
            case "y":
                date.setFullYear(date.getFullYear() + timeAmount);
                break;
            case "h":
                date.setHours(date.getHours() + timeAmount);
                break;
            case "m":
                date.setMinutes(date.getMinutes() + timeAmount);
                break;
            case "s":
                date.setSeconds(date.getSeconds() + timeAmount);
                break
            case "w":
                date.setDate(date.getDate() + timeAmount * 7);
                break
        }
        return date;
    }

    private applyRoundModifier(timeModifier: TimeModifier, date: Date): Date {
        return date;
    }
}