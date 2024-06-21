
type DateString = String;

export class DateParser {

    public parse(datestring: DateString): Date {
        return new Date();
    }
    public stringify(date: Date): DateString {
        return '';
    }

    public sum(a: number, b: number): number {
        return a + b;
    }

}