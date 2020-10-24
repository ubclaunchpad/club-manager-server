module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    extends: ['plugin:@typescript-eslint/recommended', 'prettier/@typescript-eslint', 'plugin:prettier/recommended'],
    env: {
        commonjs: true,
        es6: true,
        node: true,
    },
    rules: {
        // New rules can be inserted here to override some default configurations
    },
};
