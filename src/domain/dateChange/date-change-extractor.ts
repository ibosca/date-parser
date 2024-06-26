import {DateChange, TimeOperator, TimeUnit} from "./date-change";
import {DateString} from "../../service/date-parser";
import {DateChangeFactory} from "./date-change-factory";

export class DateChangeExtractor {
    public extract(datestring: DateString): DateChange[] {
        return [
            ...this.buildAddModifiers(datestring),
            ...this.buildRoundModifiers(datestring)
        ];
    }

    private buildAddModifiers(datestring: DateString): DateChange[] {
        const operationalModifiers = datestring.match(/[+-]?\d+[dMyhmsw]/g) ?? [];

        return operationalModifiers.map((stringModifier): DateChange => {
            return DateChangeFactory.build(
                stringModifier.charAt(0) as TimeOperator,
                stringModifier.charAt(stringModifier.length - 1) as TimeUnit,
                Number(stringModifier.substring(0, stringModifier.length - 1)),
            );
        });
    }

    private buildRoundModifiers(datestring: DateString): DateChange[] {
        const roundModifiers = datestring.match(/\/[dMyhmsw]/) ?? [];

        return roundModifiers.map((stringModifier): DateChange => {
            return DateChangeFactory.build(
                stringModifier.charAt(0) as TimeOperator,
                stringModifier.charAt(stringModifier.length - 1) as TimeUnit
            );
        });
    }
}