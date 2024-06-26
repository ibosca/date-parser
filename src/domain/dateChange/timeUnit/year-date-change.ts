import {DateChange, TimeUnit} from "../date-change";

export class YearDateChange extends DateChange {

    modify(date: Date, amount: number): Date {
        date.setUTCFullYear(date.getFullYear() + amount)
        return date;
    }

    round(date: Date): Date {
        const middleOfYear = new Date(date.getUTCFullYear(), 5, 16);

        date >= middleOfYear
            ? date.setUTCFullYear(date.getFullYear() + 1, 0, 1)
            : date.setUTCFullYear(date.getFullYear(), 0, 1);

        return date;
    }

    unit(): TimeUnit {
        return 'y';
    }
}