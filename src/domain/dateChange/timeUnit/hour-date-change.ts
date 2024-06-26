import {DateChange, TimeUnit} from "../date-change";

export class HourDateChange extends DateChange {

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

    unit(): TimeUnit {
        return 'h';
    }
}