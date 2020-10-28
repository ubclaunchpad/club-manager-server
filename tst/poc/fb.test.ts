import { fizzBuzz } from './fb';

/*
 * Test the FizzBuzz function
 *
 * Used as a POC sample for unit testing
 */
test('POC Unit Test (FizzBuzz)', () => {
    expect(fizzBuzz(2)).toBe('1 2 ');

    expect(fizzBuzz(3)).toBe('1 2 Fizz ');

    expect(fizzBuzz(5)).toBe('1 2 Fizz 4 Buzz ');
});
