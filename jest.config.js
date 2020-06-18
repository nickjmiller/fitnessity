module.exports = {
    // The root of your source code, typically /src
    // `<rootDir>` is a token Jest substitutes
    roots: ["<rootDir>/src"],

    moduleNameMapper: {
        src: ["<rootDir>/src"],
    },

    moduleDirectories: [
        "src",
        "node_modules",
    ],

    // Module file extensions for importing
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
