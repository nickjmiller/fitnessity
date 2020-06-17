module.exports = {
    env: {
        browser: true,
        es6: true,
        jest: true,
    },
    extends: [
        "plugin:react/recommended",
        "airbnb",
    ],
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 11,
        sourceType: "module",
    },
    plugins: [
        "react",
        "@typescript-eslint",
    ],
    rules: {
        "import/no-unresolved": "off",
        "import/extensions": "off",
        "react/jsx-filename-extension": [2, { "extensions": [".js", ".jsx", ".ts", ".tsx"] }],
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": "off",
        "react/jsx-one-expression-per-line": "off",
        "react/prop-types": "off",
        "no-plusplus": "off",
        semi: ["error", "always"],
        quotes: ["error", "double"],
        indent: ["error", 4],
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": [
            "error"
        ],
    },
};
