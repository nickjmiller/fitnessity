import path from "path";
import EXERCISES from "./src/data/exercises";
// import { Exercise } from "./types";
// Typescript support in static.config.js is not yet supported, but is coming in a future update!

export default {
    entry: path.join(__dirname, "src", "index.tsx"),
    getRoutes: async () => [
        {
            path: "/exercises",
            getData: () => ({
                EXERCISES,
            }),
            children: EXERCISES.map((exercise) => ({
                path: `/${exercise.title.replace(/\s/g, "").toLowerCase()}`,
                template: "src/containers/Exercise",
                getData: () => ({
                    exercise,
                }),
            })),
        },
    ],
    plugins: [
        "react-static-plugin-typescript",
        [
            require.resolve("react-static-plugin-source-filesystem"),
            {
                location: path.resolve("./src/pages"),
            },
        ],
        require.resolve("react-static-plugin-reach-router"),
        require.resolve("react-static-plugin-sitemap"),
    ],
};
