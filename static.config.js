/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
import React from "react";
import path from "path";
import EXERCISES from "./src/data/exercises";

export default {
    entry: path.join(__dirname, "src", "index.tsx"),
    Document: ({
        Html,
        Head,
        Body,
        children,
    }) => (
            <Html lang="en-US">
                <Head>
                    <title>Integrum</title>
                    <meta charSet="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                </Head>
                <Body>{children}</Body>
            </Html>
        ),
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
    siteroot: "https://integrum.nickmiller.dev",
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
