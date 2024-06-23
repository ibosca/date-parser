import {TimeModifier, TimeOperator, TimeUnit} from "./time-modifier";
import {DateString} from "../../service/date-parser";
import {TimeModifierFactory} from "./time-modifier-factory";

export class TimeModifierExtractor {
    public extract(datestring: DateString): TimeModifier[] {
        return [
            ...this.buildAddModifiers(datestring),
            ...this.buildRoundModifiers(datestring)
        ];
    }

    private buildAddModifiers(datestring: DateString): TimeModifier[] {
        const operationalModifiers = datestring.match(/[+-]?\d+[dMyhmsw]/g) ?? [];

        return operationalModifiers.map((stringModifier): TimeModifier => {
            return TimeModifierFactory.build(
                stringModifier.charAt(0) as TimeOperator,
                stringModifier.charAt(stringModifier.length - 1) as TimeUnit,
                Number(stringModifier.substring(1, stringModifier.length - 1)),
            );
        });
    }

    private buildRoundModifiers(datestring: DateString): TimeModifier[] {
        const roundModifiers = datestring.match(/\/[dMyhmsw]/) ?? [];

        return roundModifiers.map((stringModifier): TimeModifier => {
            return TimeModifierFactory.build(
                stringModifier.charAt(0) as TimeOperator,
                stringModifier.charAt(stringModifier.length - 1) as TimeUnit
            );
        });
    }
}