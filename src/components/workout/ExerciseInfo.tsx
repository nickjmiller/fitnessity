import React from "react";
import {
    Box, Heading, Text,
} from "rebass";

type ExerciseInfoProps = {
    title: string;
    description: string;
    videoId: string;
}

const ExerciseInfo: React.FC<ExerciseInfoProps> = ({ title, description, videoId }) => (
    <Box>
        <Heading
            fontSize={[28, 33, 48]}
            color="primary"
        >
            {title}
        </Heading>
        <Text
            fontSize={[12, 17, 22]}
            color="secondary"
        >
            {description}
        </Text>
        <Box height="45vh" paddingTop="2em">
            <iframe
                title="workout"
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}?controls=0&showinfo=0&rel=0&loop=1&autoplay=1&mute=1&playlist=${videoId}&origin=https://integrum.nickmiller.dev`}
                frameBorder="0"
            />
        </Box>
    </Box>
);

/* <iframe
    title="Workouts"
    width="100%"
    height="100%"
    frameBorder="0"
/>
*/

export default ExerciseInfo;
