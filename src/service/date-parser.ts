import {TimeModifier, TimeUnit} from "../domain/time-modifier";
import {TimeModifierExtractor} from "./time-modifier-extractor";
import {DateStringifier} from "./date-stringifier";

export type DateString = String;



export class DateParser {

    constructor(
        private readonly timeModifierExtractor: TimeModifierExtractor,
        private readonly dateStringifier: DateStringifier
    ) {}

    public parse(datestring: DateString): Date {
        const timeModifiers: TimeModifier[] = this.timeModifierExtractor.extract(datestring);

        return timeModifiers.reduce((carry, modifier): Date => {
            return modifier.apply(carry);
        }, new Date());
    }
    public stringify(date: Date): DateString {
        return this.dateStringifier.toString(date);
    }



}