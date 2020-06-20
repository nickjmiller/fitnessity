import React, { useState } from "react";
import WorkoutContainer from "components/workout/WorkoutContainer";
import {
    Button, Flex, Text, Box,
} from "rebass";
import { useDispatch } from "react-redux";
import { setWorkout } from "../features/workout/workoutSlice";


export default () => {
    const dispatch = useDispatch();
    const [hidden, setHidden] = useState(true);
    return (
        <>
            <WorkoutContainer />
            <Box hidden={hidden}>
                <Text py={2} fontSize={[12, 14, 16]}>
                    Customize workout (This will erase current progress)
                </Text>
                <Flex flexWrap="wrap" justifyContent="space-around" maxWidth={768} margin="auto">
                    <Button onClick={() => dispatch(setWorkout(["Upper", "Upper", "Upper", "Upper", "Core"]))}>
                        Upper!
                    </Button>
                    <Button onClick={() => dispatch(setWorkout(["Lower", "Lower", "Lower", "Lower", "Core"]))}>
                        Lower!
                    </Button>
                    <Button
                        onClick={() => dispatch(setWorkout(["Lower", "Upper", "Lower", "Upper", "Core"]))}
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
