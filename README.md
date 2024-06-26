# PetsApp tech test

## Getting started

First, install dependencies using:
```bash
$ npm i
```

Then run the tests using:
```bash
$ npm test
```

## Overview to the code

### DateChange
The DateChange classes represent modifications to a Date object. Each class encapsulates the logic to apply specific modifications, adhering to the Open-Closed Principle and Single Responsibility Principle. This design improves code clarity and eliminates the need for unnecessary switches.

### TimeDifferenceChecker
The TimeDifferenceChecker class calculates the time difference between two dates. It returns a DateChange object if there is a difference, or undefined if there isn't.
### DateParser
This is the entry point, containing the required signature:

```typescript
type DateString = String;

fn parse(datestring: DateString): Date;
fn stringify(date: Date): DateString;
```

Let's review both methods:

**Parse**

This method converts a string into a Date object in two phases:

1. Extract the DateChange list from the string using DateChangeExtractor. This is achieved with two regular expressions: one for add/subtract operations and another for round operations.
2. Apply the extracted DateChange objects to the current Date.


**Stringify**

This method converts a Date object into a string representing the time difference:

1. Prepare a list of TimeDifferenceChecker.
2. Iterate through the list to collect all DateChange objects.
3. Concatenate the string representations of these objects using the reduce method.

## Considerations

- The code might seem complex due to the number of classes created for DateChange and TimeDifferenceChecker. In a real-world scenario, a third-party library would typically be used unless this logic is core to the business. Given the nature of this test, I aimed for an extensible solution that covers the requested features.
- The code has been tested with the provided cases. However, it might fail for untested edge cases. For a production-ready implementation, additional test cases should be created to cover potential corner cases.