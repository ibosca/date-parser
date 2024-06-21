import {TimeModifier, TimeOperator, TimeUnit} from "./time-modifier";

type DateString = String;

export class DateParser {

    public parse(datestring: DateString): Date {
        const timeModifiers: TimeModifier[] = this.buildTimeModifiersFromDateString(datestring);

        return timeModifiers.reduce((carry, modifier): Date => {
            return modifier.apply(carry);
        }, new Date());
    }
    public stringify(date: Date): DateString {
        return '';
    }

    private buildTimeModifiersFromDateString(datestring: DateString): TimeModifier[] {
        return [
            ...this.buildOperationalModifiers(datestring),
            ...this.buildRoundModifiers(datestring)
        ];
    }

    private buildOperationalModifiers(datestring: DateString): TimeModifier[] {
        const operationalModifiers = datestring.match(/[+-]?\d+[dMyhmsw]/g) ?? [];

        return operationalModifiers.map((stringModifier): TimeModifier => {
            return new TimeModifier(
                stringModifier.charAt(0) as TimeOperator,
                stringModifier.charAt(stringModifier.length - 1) as TimeUnit,
                Number(stringModifier.substring(1, stringModifier.length - 1)),
            );
        });
    }

    private buildRoundModifiers(datestring: DateString): TimeModifier[] {
        const roundModifiers = datestring.match(/\/[dMyhmsw]/) ?? [];

        return roundModifiers.map((stringModifier): TimeModifier => {
            return new TimeModifier(
                stringModifier.charAt(0) as TimeOperator,
                stringModifier.charAt(stringModifier.length - 1) as TimeUnit,
        );
        });
    }


}