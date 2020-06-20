import React from "react";
import { Box, Flex } from "rebass";
import { Link } from "@reach/router";
import ExerciseList from "./ExerciseList";

export default () => (
    <Box p={4}>
        <ExerciseList header />
        <Flex py={4} flexDirection="column">
            <Link to="/settings">Settings</Link>
        </Flex>
    </Box>
);
