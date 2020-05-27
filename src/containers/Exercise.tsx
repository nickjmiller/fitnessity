import React from "react";
import { useRouteData } from "react-static";
import { Link } from "@reach/router";
import { Button, Box, Text } from "rebass";
import { Exercise } from "src/data/exercises";
import ExerciseInfo from "../components/workout/ExerciseInfo";

export default () => {
    const { exercise }: { exercise: Exercise } = useRouteData();
    return (
        <Box>
            <Link to="/exercises/">
                <Button variant="primary" marginBottom="1em">Go Back</Button>
            </Link>
            <ExerciseInfo exercise={exercise} />
            <Text>
                Muscle Groups: {exercise.muscles.join(", ")}
            </Text>
            {exercise.equipment.length
                ? (
                    <Text>
                        Equipment: {exercise.equipment.join(", ")}
                    </Text>
                ) : null}

        </Box>
    );
};
