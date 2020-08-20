import React from "react";
import { Link } from "@reach/router";
import { useRouteData } from "react-static";
import { Box, Heading } from "rebass";

// TODO: Export to shared types

export default () => {
    const { EXERCISES } = useRouteData();
    return (
        <Box>
            <Heading>Exercises</Heading>
            <ul>
                {EXERCISES.map((exercise: any) => (
                    <li key={exercise.title}>
                        <Link to={`/exercises/${exercise.title.replace(/\s/g, "").toLowerCase()}/`}>{exercise.title}</Link>
                    </li>
                ))}
            </ul>
        </Box>
    );
};
