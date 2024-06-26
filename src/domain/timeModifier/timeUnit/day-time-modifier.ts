import {TimeModifier, TimeUnit} from "../time-modifier";

export class DayTimeModifier extends TimeModifier {

    modify(date: Date, amount: number): Date {
        date.setUTCDate(date.getUTCDate() + amount)
        return date;
    }

    round(date: Date): Date {
        const middleOfDay = 12;

        date.getUTCHours() >= middleOfDay
            ? date.setUTCDate(date.getUTCDate() + 1)
            : date.setUTCDate(date.getUTCDate())

        return date;
    }

    unit(): TimeUnit {
        return 'd';
    }
}