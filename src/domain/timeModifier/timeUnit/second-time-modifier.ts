import {TimeModifier} from "../time-modifier";

export class SecondTimeModifier extends TimeModifier {

    modify(date: Date, amount: number): Date {
        date.setUTCSeconds(date.getUTCSeconds() + amount)
        return date;
    }

    round(date: Date): Date {
        const middleOfSecond = 500;

        date.getMilliseconds() >= middleOfSecond
            ? date.setUTCSeconds(date.getUTCSeconds() + 1)
            : date.setUTCSeconds(date.getUTCSeconds());

        return date;
    }
}