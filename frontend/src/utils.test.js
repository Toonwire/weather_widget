import utils from './utils.js';

describe('capitalize()', () => {
  const testCases = [
    { stringToCap: "hello", numCap: 1, expected: "Hello" },
    { stringToCap: "hello", numCap: 3, expected: "HELlo" },
    { stringToCap: "hello", numCap: 0, expected: "hello" },
    { stringToCap: "hello", numCap: 100, expected: "HELLO" },
    { stringToCap: "hello", numCap: -1, expected: "HELLo" },
  ]

  testCases.forEach(testCase => {
    test(`Capitalizing the first ${testCase.numCap} character(s) in '${testCase.stringToCap}'`, () => {
      expect(utils.capitalize(testCase.stringToCap, testCase.numCap)).toBe(testCase.expected);
    });
  });
});

describe('degToDir()', () => {
  const testCases = [
    { degrees: 7.06, expected: "N" },
    { degrees: 81, expected: "E" },
    { degrees: 120, expected: "ESE" },
    { degrees: 500, expected: "SE" },
    { degrees: -500, expected: "SE" }, // function should handle negative degrees as if positive (less math for me)
  ]

  testCases.forEach(testCase => {
    test(`A wind pointed ${testCase.degrees} is going in a '${testCase.expected}' direction`, () => {
      expect(utils.degToDir(testCase.degrees)).toBe(testCase.expected);
    });
  });
});
