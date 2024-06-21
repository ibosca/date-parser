
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
            return this.applyAdditionModifier(timeModifier, date);
        }

        if (this.isSubstractModifier(timeModifier)) {
            return this.applySubtractModifier(timeModifier, date);
        }

        return this.applyRoundModifier(timeModifier, date);
    }

    private isAdditionModifier(timeModifier: TimeModifier): boolean {
        return timeModifier.timeOperator == "+";
    }

    private isSubstractModifier(timeModifier: TimeModifier): boolean {
        return timeModifier.timeOperator == "-";
    }

    private applyAdditionModifier(timeModifier: TimeModifier, date: Date): Date {
        switch (timeModifier.timeUnit) {
            case "d":
                date.setDate(date.getDate() + timeModifier.timeAmount!);
                break;
            case "M":
                date.setMonth(date.getMonth() + timeModifier.timeAmount!);
                break;
            case "y":
                date.setFullYear(date.getFullYear() + timeModifier.timeAmount!);
                break;
            case "h":
                date.setHours(date.getHours() + timeModifier.timeAmount!);
                break;
            case "m":
                date.setMinutes(date.getMinutes() + timeModifier.timeAmount!);
                break;
            case "s":
                date.setSeconds(date.getSeconds() + timeModifier.timeAmount!);
                break
            case "w":
                date.setDate(date.getDate() + timeModifier.timeAmount! * 7);
                break
        }
        return date;
    }

    private applySubtractModifier(timeModifier: TimeModifier, date: Date): Date {
        switch (timeModifier.timeUnit) {
            case "d":
                date.setDate(date.getDate() - timeModifier.timeAmount!);
                break;
            case "M":
                date.setMonth(date.getMonth() - timeModifier.timeAmount!);
                break;
            case "y":
                date.setFullYear(date.getFullYear() - timeModifier.timeAmount!);
                break;
            case "h":
                date.setHours(date.getHours() - timeModifier.timeAmount!);
                break;
            case "m":
                date.setMinutes(date.getMinutes() - timeModifier.timeAmount!);
                break;
            case "s":
                date.setSeconds(date.getSeconds() - timeModifier.timeAmount!);
                break
            case "w":
                date.setDate(date.getDate() - timeModifier.timeAmount! * 7);
                break
        }
        return date;
    }

    private applyRoundModifier(timeModifier: TimeModifier, date: Date): Date {
        return date;
    }
}