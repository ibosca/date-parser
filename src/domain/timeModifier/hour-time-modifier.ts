import {TimeModifier} from "./time-modifier";

export class HourTimeModifier extends TimeModifier {

    modify(date: Date, amount: number): Date {
        date.setUTCHours(date.getUTCHours() + amount)
        return date;
    }

    round(date: Date): Date {
        const middleOfHour = 30;

        date.getUTCMinutes() >= middleOfHour
            ? date.setUTCHours(date.getHours() + 1)
            : date.setUTCHours(date.getHours());

        return date;
    }
}