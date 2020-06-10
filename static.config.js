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
                    <title>Fitnessity</title>
                    <meta charSet="UTF-8" />
                    <meta name="theme-color" content="#3333ee" />
                    <link rel="apple-touch-icon" href="/touch.png" />
                    <link rel="manifest" href="manifest.webmanifest" />
                    <noscript>
                        Please enable javascript.
                    </noscript>
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
            children: EXERCISES.sort((a, b) => a.title.localeCompare(b.title)).map((exercise) => ({
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
    siteRoot: "https://www.fitnessity.org",
    stagingSiteRoot: "http://127.0.0.1:3000",
};
