import {TimeModifier, TimeOperator, TimeUnit} from "./time-modifier";

export class RoundTimeModifier extends TimeModifier {

    constructor(timeOperator: TimeOperator, timeUnit: TimeUnit) {
        super(timeOperator, timeUnit);
    }

    public apply(date: Date): Date {
        switch (this.timeUnit) {
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