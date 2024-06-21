import {TimeModifier, TimeOperator, TimeUnit} from "./time-modifier";

type DateString = String;

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

    private buildTimeModifiersFromDateString(datestring: DateString): TimeModifier[] {
        return [
            ...this.buildOperationalModifiers(datestring),
            ...this.buildRoundModifiers(datestring)
        ];
    }

    private buildOperationalModifiers(datestring: DateString): TimeModifier[] {
        const operationalModifiers = datestring.match(/[+-]?\d+[dMyhmsw]/g) ?? [];

        return operationalModifiers.map((stringModifier): TimeModifier => {
            return new TimeModifier(
                stringModifier.charAt(0) as TimeOperator,
                stringModifier.charAt(stringModifier.length - 1) as TimeUnit,
                Number(stringModifier.substring(1, stringModifier.length - 1)),
            );
        });
    }

    private buildRoundModifiers(datestring: DateString): TimeModifier[] {
        const roundModifiers = datestring.match(/\/[dMyhmsw]/) ?? [];

        return roundModifiers.map((stringModifier): TimeModifier => {
            return new TimeModifier(
                stringModifier.charAt(0) as TimeOperator,
                stringModifier.charAt(stringModifier.length - 1) as TimeUnit,
        );
        });
    }

    private apply(timeModifier: TimeModifier, date: Date): Date {
        if (this.isAdditionModifier(timeModifier) || this.isSubtractModifier(timeModifier)) {
            return this.applyOperationModifier(timeModifier, date);
        }

        return this.applyRoundModifier(timeModifier, date);
    }

    private isAdditionModifier(timeModifier: TimeModifier): boolean {
        return timeModifier.timeOperator == "+";
    }

    private isSubtractModifier(timeModifier: TimeModifier): boolean {
        return timeModifier.timeOperator == "-";
    }

    private applyOperationModifier(timeModifier: TimeModifier, date: Date): Date {

        const timeAmount: number = Number(`${timeModifier.timeOperator}${timeModifier.timeAmount!}`);

        const operations: { [key: string]: (amount: number) => void } = {
            "d": (amount: number) => date.setUTCDate(date.getUTCDate() + amount),
            "M": (amount: number) => date.setUTCMonth(date.getUTCMonth() + amount),
            "y": (amount: number) => date.setUTCFullYear(date.getFullYear() + amount),
            "h": (amount: number) => date.setUTCHours(date.getUTCHours() + amount),
            "m": (amount: number) => date.setUTCMinutes(date.getUTCMinutes() + amount),
            "s": (amount: number) => date.setUTCSeconds(date.getUTCSeconds() + amount),
            "w": (amount: number) => date.setUTCDate(date.getUTCDate() + amount * 7)
        };

        const operation = operations[timeModifier.timeUnit];
        if (!operation) {
            throw new Error('Wrong time unit provided!')
        }

        operation(timeAmount);
        return date;
    }

    private applyRoundModifier({timeUnit}: TimeModifier, date: Date): Date {
        switch (timeUnit) {
            case 'y':
                return this.roundYear(date);
            case 'M':
                return this.roundMonth(date);
            case 'd':
                return this.roundDay(date);
            case 'h':
                return this.roundHour(date);
            case 'm':
                return this.roundMinute(date);
            case 's':
                return this.roundSecond(date);
            case 'w':
                return this.roundWeek(date);
            default:
                throw new Error('Wrong time unit provided!');
        }
    }

    private roundYear(date: Date): Date {
        const middleOfYear = new Date(date.getUTCFullYear(), 5, 16);

        date >= middleOfYear
            ? date.setUTCFullYear(date.getFullYear() + 1, 0, 1)
            : date.setUTCFullYear(date.getFullYear(), 0, 1);

        return date;
    }

    private roundMonth(date: Date): Date {
        const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        const middleOfMonth = new Date(date.getUTCFullYear(), Math.ceil(daysInMonth / 2));

        date >= middleOfMonth
            ? date.setUTCMonth(date.getUTCMonth() + 1, 1)
            : date.setUTCMonth(date.getUTCMonth(), 1);

        return date;
    }

    private roundDay(date: Date): Date {
        const middleOfDay = 12;

        date.getUTCHours() >= middleOfDay
            ? date.setUTCDate(date.getUTCDate() + 1)
            : date.setUTCDate(date.getUTCDate())

        return date;
    }

    private roundHour(date: Date): Date {
        const middleOfHour = 30;

        date.getUTCMinutes() >= middleOfHour
            ? date.setUTCHours(date.getHours() + 1)
            : date.setUTCHours(date.getHours());

        return date;

    }

    private roundMinute(date: Date): Date {
        const middleOfMinute = 30;

        date.getUTCSeconds() >= middleOfMinute
            ? date.setUTCMinutes(date.getUTCMinutes() + 1)
            : date.setUTCHours(date.getUTCMinutes());

        return date;
    }

    private roundSecond(date: Date): Date {
        const middleOfSecond = 500;

        date.getMilliseconds() >= middleOfSecond
            ? date.setUTCSeconds(date.getUTCSeconds() + 1)
            : date.setUTCSeconds(date.getUTCSeconds());

        return date;
    }

    private roundWeek(date: Date): Date {
        const dayOfWeek = date.getDay();
        const middleOfWeek = 3.5;

        dayOfWeek >= middleOfWeek
            ? date.setDate(date.getDate() + (7 - dayOfWeek))
            : date.setDate(date.getDate() - dayOfWeek)

        return date;
    }
}