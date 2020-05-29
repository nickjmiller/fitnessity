import React from "react";
import {
    Box, Heading, Text,
} from "rebass";
import { Exercise } from "src/data/exercises";

type ExerciseInfoProps = {
    exercise: Exercise;
}

const ExerciseInfo: React.FC<ExerciseInfoProps> = ({ exercise }) => {
    const {
        title, description, videoSrc, alternate,
    } = exercise;
    return (
        <Box>
            <Heading
                fontSize={[28, 33, 48]}
                color="primary"
            >
                {alternate ? "(Alternate) " : ""}{title}
            </Heading>
            <Text
                fontSize={[12, 17, 22]}
                color="secondary"
            >
                {description}
            </Text>
            <Box sx={{
                height: "45vh",
                margin: "0 auto",
            }}
            >
                <video
                    height="100%"
                    width="100%"
                    autoPlay
                    loop
                    muted
                    playsInline
                    src={videoSrc}
                />
            </Box>
        </Box>
    );
};

export default ExerciseInfo;
