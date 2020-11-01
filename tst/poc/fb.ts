/*
 * Simple FizzBuzz function that implements a solution to the classic LeetCode problem
 *
 * Used as a POC sample for unit testing
 */
export const fizzBuzz = (n: number): string => {
    let output = '';
    for (let i = 1; i <= n; i++) {
        if (i % 5 && i % 3) {
            output += i + ' ';
        }
        if (i % 3 === 0) {
            output += 'Fizz ';
        }
        if (i % 5 === 0) {
            output += 'Buzz ';
        }
    }
    return output;
};
