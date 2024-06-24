import {TimeModifier} from "../time-modifier";

export class MonthTimeModifier extends TimeModifier {

    modify(date: Date, amount: number): Date {
        date.setUTCMonth(date.getUTCMonth() + amount)
        return date;
    }

    round(date: Date): Date {
        const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        const middleOfMonth = new Date(date.getUTCFullYear(), Math.ceil(daysInMonth / 2));

        date >= middleOfMonth
            ? date.setUTCMonth(date.getUTCMonth() + 1, 1)
            : date.setUTCMonth(date.getUTCMonth(), 1);

        return date;
    }
}