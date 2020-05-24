import React from "react";
import { useRouteData } from "react-static";
import { Link } from "@reach/router";
import { Button, Box } from "rebass";
import ExerciseInfo from "../components/workout/ExerciseInfo";
// eslint-disable-next-line no-unused-vars

export default () => {
    const { exercise }: { exercise: any} = useRouteData();
    return (
        <Box>
            <Link to="/exercises/">
                <Button variant="primary">Go Back</Button>
            </Link>
            <br />
            <ExerciseInfo
                title={exercise.title}
                description={exercise.description}
                videoId={exercise.videoId}
            />
        </Box>
    );
};
