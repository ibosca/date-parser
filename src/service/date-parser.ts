import {TimeModifier, TimeOperator, TimeUnit} from "../domain/time-modifier";
import {TimeModifierExtractor} from "./time-modifier-extractor";

export type DateString = String;

export class DateParser {

    constructor(
        private readonly timeModifierExtractor: TimeModifierExtractor
    ) {}

    public parse(datestring: DateString): Date {
        const timeModifiers: TimeModifier[] = this.timeModifierExtractor.extract(datestring);

        return timeModifiers.reduce((carry, modifier): Date => {
            return modifier.apply(carry);
        }, new Date());
    }
    public stringify(date: Date): DateString {
        return '';
    }




}