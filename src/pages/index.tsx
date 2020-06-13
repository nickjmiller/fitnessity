import React, { useState } from "react";
import WorkoutContainer from "components/workout/WorkoutContainer";
import {
    Button, Flex, Text, Box,
} from "rebass";
import { WORKOUT_MAP, WorkoutGroup } from "../data/MuscleMap";
// eslint-disable-next-line import/named
import EXERCISES, { Exercise } from "../data/exercises";

const shuffleExercises = (workoutPlan: WorkoutGroup[]) => {
    let array = [...EXERCISES];
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    const workout: Exercise[] = [];

    while (workoutPlan.length) {
        const exerciseIndex = array.findIndex(
            (e) => e.muscles.map((m) => WORKOUT_MAP[m]).includes(workoutPlan[0]),
        );
        workout.push(array[exerciseIndex]);
        array = array.slice(exerciseIndex + 1);
        workoutPlan.shift();
    }

    return workout;
};

const DEFAULT_WORKOUT_PLAN: WorkoutGroup[] = ["Lower", "Upper", "Lower", "Upper", "Core"];

const INITIAL_WORKOUT = shuffleExercises([...DEFAULT_WORKOUT_PLAN]);

export default () => {
    const [workoutPlan, setWorkoutPlan] = useState(INITIAL_WORKOUT);
    const [hidden, setHidden] = useState(false);
    return (
        <>
            <WorkoutContainer workout={workoutPlan} />
            <Box hidden={hidden}>
                <Text py={2} fontSize={[12, 14, 16]}>
                    Customize workout (This will erase current progress)
                </Text>
                <Flex flexWrap="wrap" justifyContent="space-around" maxWidth={768} margin="auto">
                    <Button onClick={() => setWorkoutPlan(shuffleExercises(["Upper", "Upper", "Upper", "Upper", "Core"]))}>
                        Upper!
                    </Button>
                    <Button onClick={() => setWorkoutPlan(shuffleExercises(["Lower", "Lower", "Lower", "Lower", "Core"]))}>
                        Lower!
                    </Button>
                    <Button
                        onClick={() => setWorkoutPlan(shuffleExercises([...DEFAULT_WORKOUT_PLAN]))}
                    >
                        Balanced!
                    </Button>
                    <Button variant="outline" onClick={() => setHidden(true)}>
                        Hide
                    </Button>
                </Flex>
            </Box>
            <Box hidden={!hidden}>
                <Button variant="outline" onClick={() => setHidden(false)}>
                    Show Workout Options
                </Button>
            </Box>
        </>
    );
};
