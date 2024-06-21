import {TimeModifier, TimeOperator, TimeUnit} from "../domain/time-modifier";
import {AddTimeModifier} from "../domain/add-time-modifier";
import {RoundTimeModifier} from "../domain/round-time-modifier";
import {DateString} from "./date-parser";

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
            return new AddTimeModifier(
                stringModifier.charAt(0) as TimeOperator,
                stringModifier.charAt(stringModifier.length - 1) as TimeUnit,
                Number(stringModifier.substring(1, stringModifier.length - 1)),
            );
        });
    }

    private buildRoundModifiers(datestring: DateString): TimeModifier[] {
        const roundModifiers = datestring.match(/\/[dMyhmsw]/) ?? [];

        return roundModifiers.map((stringModifier): TimeModifier => {
            return new RoundTimeModifier(
                stringModifier.charAt(0) as TimeOperator,
                stringModifier.charAt(stringModifier.length - 1) as TimeUnit
            );
        });
    }
}