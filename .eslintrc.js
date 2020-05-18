module.exports = {
    env: {
        browser: true,
        es6: true,
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
        "react/jsx-indent" : ["error", 4],
        semi: ["error", "always"],
        quotes: ["error", "double"],
        indent: ["error", 4],
    },
};
