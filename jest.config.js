module.exports = {
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
    preset: '@shelf/jest-mongodb',
    testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
    transform: {
        '.(ts|tsx)': 'ts-jest',
    },
};
