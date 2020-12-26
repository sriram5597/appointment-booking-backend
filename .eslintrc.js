module.exports = {
    env: {
        node: true,
        commonjs: true,
    },
    extends: [
        'airbnb-base',
        'eslint:recommended',
    ],
    parserOptions: {
        ecmaVersion: 12,
    },
    rules: {
        semi: 'error',
        indent: ['error', 4],
    },
};
