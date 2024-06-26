import {TimeModifier, TimeUnit} from "../time-modifier";

export class MinuteTimeModifier extends TimeModifier {

    modify(date: Date, amount: number): Date {
        date.setUTCMinutes(date.getUTCMinutes() + amount)
        return date;
    }

    round(date: Date): Date {
        const middleOfMinute = 30;

        date.getUTCSeconds() >= middleOfMinute
            ? date.setUTCMinutes(date.getUTCMinutes() + 1)
            : date.setUTCHours(date.getUTCMinutes());

        return date;
    }

    unit(): TimeUnit {
        return 'm';
    }
}