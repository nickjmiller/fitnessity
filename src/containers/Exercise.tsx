import React, { useState } from "react";
import { useRouteData } from "react-static";
import { Link } from "@reach/router";
import { Button, Text, Flex } from "rebass";
import { Exercise } from "src/data/exercises";
import WorkoutContainer from "components/workout/WorkoutContainer";
import ExerciseInfo from "components/workout/ExerciseInfo";

export default () => {
    const { exercise }: { exercise: Exercise } = useRouteData();
    const [workout, setWorkout] = useState(false);
    return (
        <Flex flexDirection="column">
            <Link to="/exercises/">
                <Button variant="primary" marginBottom="1em">Go Back</Button>
            </Link>
            {!workout ? <Button margin="auto" variant="secondary" onClick={() => setWorkout(true)}>Start Workout</Button> : null}
            {workout
                ? <WorkoutContainer workout={[exercise]} /> : <ExerciseInfo exercise={exercise} />}
            <Text>
                Muscle Groups: {exercise.muscles.join(", ")}
            </Text>
            {exercise.equipment.length
                ? (
                    <Text>
                        Equipment: {exercise.equipment.join(", ")}
                    </Text>
                ) : null}

        </Flex>
    );
};
