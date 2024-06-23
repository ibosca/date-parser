import {TimeModifier} from "./time-modifier";

export class WeekTimeModifier extends TimeModifier {

    modify(date: Date, amount: number): Date {
        date.setUTCDate(date.getUTCDate() + amount * 7)
        return date;
    }

    round(date: Date): Date {
        const dayOfWeek = date.getDay();
        const middleOfWeek = 3.5;

        dayOfWeek >= middleOfWeek
            ? date.setDate(date.getDate() + (7 - dayOfWeek))
            : date.setDate(date.getDate() - dayOfWeek)

        return date;
    }
}