import React from "react";
import { Box, Flex, Heading } from "rebass";
import DarkModeToggle from "components/DarkModeToggle";
import WorkoutSettings from "components/WorkoutSettings";
import { Label, Select } from "@rebass/forms";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/app/rootReducer";
import { WORKOUT_PLANS, setDefaultWorkout } from "../features/workout/workoutSlice";

export default () => {
    const dispatch = useDispatch();
    const { defaultWorkoutPlan } = useSelector((state: RootState) => state.workout);
    return (
        <Flex flexDirection="column" justifyContent="space-between" minHeight={400}>
            <Heading paddingBottom={2}>Settings</Heading>
            <DarkModeToggle />
            <Box maxWidth={256}>
                <WorkoutSettings />
            </Box>
            <Box>
                Set default workout:
                <Label>
                    <Select
                        id="workout"
                        name="workout"
                        defaultValue={defaultWorkoutPlan}
                        onChange={(event) => dispatch(setDefaultWorkout(event.target.value))}
                        width="20em"
                    >
                        {Object.keys(WORKOUT_PLANS).map((key) => (
                            <option key={key}>
                                {key}
                            </option>
                        ))}
                    </Select>
                </Label>
            </Box>
        </Flex>
    );
};
