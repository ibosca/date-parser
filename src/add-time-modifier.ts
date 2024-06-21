import {TimeModifier, TimeOperator, TimeUnit} from "./time-modifier";

export class AddTimeModifier extends TimeModifier {

    constructor(
        timeOperator: TimeOperator,
        timeUnit: TimeUnit,
        public readonly timeAmount: number
    ) {
        super(timeOperator, timeUnit);
    }

    apply(date: Date): Date {
        const operations: { [key: string]: (amount: number) => void } = {
            "d": (amount: number) => this.addDay(date, amount),
            "M": (amount: number) => this.addMonth(date, amount),
            "y": (amount: number) => this.addYear(date, amount),
            "h": (amount: number) => this.addHour(date, amount),
            "m": (amount: number) => this.addMinute(date, amount),
            "s": (amount: number) => this.addSecond(date, amount),
            "w": (amount: number) => this.addWeek(date, amount),
        };

        const operation = operations[this.timeUnit];
        if (!operation) {
            throw new Error('Wrong time unit provided!')
        }

        const timeAmount: number = Number(`${this.timeOperator}${this.timeAmount!}`);
        operation(timeAmount);
        return date;
    }

    private addDay(date: Date, amount: number): Date {
        date.setUTCDate(date.getUTCDate() + amount)
        return date;
    }

    private addMonth(date: Date, amount: number): Date {
        date.setUTCMonth(date.getUTCMonth() + amount)
        return date;
    }

    private addYear(date: Date, amount: number): Date {
        date.setUTCFullYear(date.getFullYear() + amount)
        return date;
    }

    private addHour(date: Date, amount: number): Date {
        date.setUTCHours(date.getUTCHours() + amount)
        return date;
    }
    private addMinute(date: Date, amount: number): Date {
        date.setUTCMinutes(date.getUTCMinutes() + amount)
        return date;
    }
    private addSecond(date: Date, amount: number): Date {
        date.setUTCSeconds(date.getUTCSeconds() + amount)
        return date;
    }
    private addWeek(date: Date, amount: number): Date {
        date.setUTCDate(date.getUTCDate() + amount * 7)
        return date;
    }


}