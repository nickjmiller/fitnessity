import React from "react";
import WorkoutContainer from "components/workout/WorkoutContainer";
import { Box } from "rebass";
import EXERCISES from "../data/exercises";

const shuffleExercises = () => {
    const array = [...EXERCISES];
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
};

export default () => (
    <Box>
        <WorkoutContainer workout={shuffleExercises().slice(0, 5)} />
    </Box>
);
