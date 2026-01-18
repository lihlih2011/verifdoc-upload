module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2024,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
    },
    plugins: [
        '@typescript-eslint',
        'react',
        'react-hooks',
        'security',
        'prettier',
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:security/recommended',
        'plugin:prettier/recommended',
    ],
    env: { browser: true, node: true, es2024: true },
    rules: {
        'security/detect-eval-with-expression': 'error',
        'prettier/prettier': 'error',
        // you can add more custom rules here
    },
    settings: { react: { version: 'detect' } },
};
