import {DateChange, TimeUnit} from "../date-change";

export class SecondDateChange extends DateChange {

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

    unit(): TimeUnit {
        return 's';
    }
}